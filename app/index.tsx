import Colors from "@/shared/Colors";
import { ActivityIndicator, Dimensions, Image, Platform, Text, TouchableOpacity, View } from "react-native";
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { useAuth, useSSO, useUser } from '@clerk/clerk-expo'
import { useCallback, useEffect, useState } from "react";
import { router, useRouter } from "expo-router";
import { doc, setDoc} from "firebase/firestore";
import { firestoreDb } from "@/config/FirebaseConfig";
export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    if (Platform.OS !== 'android') return
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}
WebBrowser.maybeCompleteAuthSession()
export default function Index() {
  const { isSignedIn } = useAuth()
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading]=useState(true);
useEffect(() => {
  if (isSignedIn === undefined) return; // still loading Clerk status

  setLoading(false);

  if (isSignedIn) {
    router.replace("/(tabs)/Home");
  }
}, [isSignedIn]);

  useWarmUpBrowser()

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO()

  const onLoginPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri(),
      })
      if(signUp) {
        await setDoc(doc(firestoreDb,'users',signUp.emailAddress??''),{
          email:signUp.emailAddress,
          name:signUp.firstName+" "+signUp.lastName,
          joinDate:Date.now(),
          credits:20
        })
      }
      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
              console.log(session?.currentTask)
              return
            }

            router.push('/')
          },
        })
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])



  return (

    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS == 'android' ? 30 : 40,
        justifyContent: 'center'
      }}
    >
      <Image source={require('./../assets/images/robot.png')}
        style={{
          width: Dimensions.get('screen').width * 0.85,
          height: Dimensions.get('screen').width * 0.85,
          resizeMode: 'contain',
        }}
      />
      <View>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 10,
          color: Colors.PRIMARY
        }}>Welcome to AI Pocket Agent</Text>
        <Text style={{
          fontSize: 18,
          textAlign: 'center',
          color: Colors.GRAY
        }}>
          Your Ultimate AI Personal Agent to make life easier.
          Try it Today, Completely Free!
        </Text>
      </View>
      {!loading &&<TouchableOpacity style={{
        width: '100%',
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 12,
        marginTop: 50,
      }} onPress={onLoginPress}>
        <Text style={{
          color: Colors.WHITE,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
        }}>Get Started</Text>
      </TouchableOpacity>}
{loading && <ActivityIndicator size={'large'} />}

    </View>
  );
}
