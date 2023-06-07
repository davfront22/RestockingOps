import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text, AsyncStorage } from "react-native";

import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useAutoDiscovery, useAuthRequest } from "expo-auth-session";
import * as SecureStore from 'expo-secure-store';
import * as Random from 'expo-random';
import * as Crypto from 'expo-crypto';



import SignInScreen from "../Screens/SignInScreen";
import GridsScreen from '../Screens/GridsScreen';
import GridScreen from '../Screens/GridScreen';
import UploadedScreen from '../Screens/UploadedScreen';
import ReadyScreen from '../Screens/ReadyScreen';
import ViewMachine from '../Screens/ViewMachine';
import SuccessScreen from '../Screens/SuccessScreen';
import CameraScreen from '../Screens/CameraScreen'; 
import HomeScreen from '../Screens/HomeScreen';
import MachineScreen from '../Screens/MachineScreen';
import PickoutScreen from '../Screens/PickoutScreen';
import ReturnScreen from '../Screens/ReturnScreen';
import { AuthContext } from "./Context";






const Stack = createNativeStackNavigator();
WebBrowser.maybeCompleteAuthSession();


const tenetID = "b0c514e9-37f1-4eb4-be2e-1b12e639cf38";
const clientID = "6374b4d2-0fe3-4781-9918-6f4d65233e5b";
const clientSecret = 'lMZ8Q~cj5~ALc.NJiZitRcXhqOwc65V7U1NWNaO3';


const MainStack = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    // const [discovery, setDiscovery] = useState([]);
    const [authRequest, setAuthRequest] = useState([]);
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [authorizeResult, setAuthorizeResult] = useState(null);
    const [accessToken, setAccessToken] = useState();

    const scopes = ["openid", "profile", "email", "offline_access"];
    const domain = `https://login.microsoftonline.com/${tenetID}/v2.0`;
  
    const redirectUri = 'msauth://com.gopass.govending/D3lVrCGsIS6P2tjch3%2FpLxm6XIc%3D';

    const discovery = useAutoDiscovery(`https://login.microsoftonline.com/${tenetID}/v2.0`);

    // Request
    const [request, response, promptAsync] = useAuthRequest({
      clientId: clientID,
      redirectUri: redirectUri,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      extraParams: {
        prompt: 'select_account',
      },
    }, discovery);
    
    useEffect(() => {
        if (response?.type === 'success') {
          const { code } = response.params;
      
          console.log('code:', code);
          console.log('clientId:', clientID);
          console.log('redirectUri:', redirectUri);
          console.log('codeVerifier:', request?.codeVerifier);
      
          (async () => {
            const body = new URLSearchParams({
              client_id: clientID,
              code: code,
              redirect_uri: redirectUri,
              grant_type: 'authorization_code',
              code_verifier: request?.codeVerifier || '',
            }).toString();
      
            const tokenUrl = discovery.tokenEndpoint;
      
            console.log('Sending POST request to:', tokenUrl);
      
            const tokenResponse = await fetch(tokenUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body,
            });
      
            console.log('Token Response: ', JSON.stringify(await tokenResponse.json(), null, 4));
          })();
        }
      }, [response]);
    
    // somewhere in your component
    const handleLogin = () => {
  promptAsync();
};
    
    // useEffect(() => {
    //     if (!redirectUrl) return;
    
    //     const getSession = async () => {
    //         try  {
    //             const d = await AuthSession.fetchDiscoveryAsync(domain);
    //             const authRequestOptions = {
    //                 prompt: AuthSession.Prompt.Login,
    //                 responseType: AuthSession.ResponseType.Code,
    //                 scopes: scopes,
    //                 usePKCE: true,
    //                 clientId: clientID,
    //                 redirectUri: redirectUrl,
    //             };
    //             const authRequest = new AuthSession.AuthRequest(authRequestOptions);
    //             setAuthRequest(authRequest);
    //             setDiscovery(d);
        
    //             // Start auth session and get the result
    //             const authResult = await authRequest.promptAsync(d);
    //             if (authResult.type === 'success') {
    //                 setAuthorizeResult(authResult);
    //             } else {
    //                 // Handle error or cancellation here
    //                 console.error('Authentication failed:', authResult);
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    
    //     getSession();
    // }, [redirectUrl]);
    
    // useEffect(() => {
    //     const getCodeExchange = async () => {
    //         if (!authorizeResult || !authorizeResult.params || !authorizeResult.params.code) {
    //             console.error("Authorize result, params, or code are not valid.")
    //             return;
    //         }
    //         let code_verifier = authRequest.codeVerifier;

    //         if (!code_verifier) {
    //             console.error("Code verifier is not valid.");
    //             return;
    //         }
        

    //         console.log(`Tenant ID: ${tenetID}`);
    //         console.log(`Client ID: ${clientID}`);
    //         console.log(`Client Secret: ${clientSecret}`);
    //         console.log(`Authorization Code: ${authorizeResult.params.code}`);
    //         console.log(`Redirect URI: ${redirectUrl}`);
    
    //         const url = `https://login.microsoftonline.com/${tenetID}/oauth2/v2.0/token?`;
    //         const body = `client_id=${clientID}&scope=openid%20profile%20email%20User.Read&code=${authorizeResult.params.code}&redirect_uri=${redirectUrl}&grant_type=authorization_code&code_verifier=${code_verifier}`;
    //         console.log("URL: " + url);
    //         console.log("URl token: " + url + body);

    //         try {
    //             const response = await fetch(url, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/x-www-form-urlencoded',
    //                 },
    //                 body: body,
    //             });
    
    //             if (!response.ok) {
    //                 const errorResponse = await response.text();
    //                 console.error(`HTTP error! status: ${response.status}, response: ${errorResponse}`);
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    
    //             const data = await response.json();
    //             console.log("Json", data);
    //             const accessToken = data.access_token;
        
    //             if (!accessToken) {
    //                 console.error("Token result or access token is not valid.")
    //                 return;
    //             }
                
    //             await SecureStore.setItemAsync('userToken', accessToken);
    //             const responseGraphAPI = await fetch(
    //                 'https://graph.microsoft.com/v1.0/me',
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${accessToken}`,
    //                     },
    //                 }
    //             );
    
    //             const responseJson = await response.json();
    //             console.log('Microsoft Graph API Response:', responseJson);
    //             return navigation.navigate("HomeScreen");
    
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    
    //     if (authorizeResult && authorizeResult.type === "success" && authRequest) {
    //         getCodeExchange();
    //     }
    // }, 
    // [authorizeResult, authRequest, discovery, clientID, redirectUrl, navigation]);


    // useEffect(() => {
    //     const fetchToken = async () => {
    //         let userToken;
    
    //         try {
    //             userToken = await SecureStore.getItemAsync('userToken');
    //         } catch (e) {
    //             console.log(e);
    //         }
    
    //         setToken(userToken);
    //     };
    
    //     fetchToken();
    // }, []);



    return (
        <Stack.Navigator>

{isAuthenticated ? (
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        title: "",
      }}
    />
  ) : (
    <Stack.Screen
  name="SignInScreen"
  component={SignInScreen}
  options={{
    title: "",
    headerRight: () => (
        <TouchableOpacity onPress={handleLogin}>
          <Text>Sign In</Text>
        </TouchableOpacity>
      ),
  }}
/>
  )}
            <Stack.Screen
                name='MachineScreen'
                component={MachineScreen}
                options={{
                    title: "",
                }}
            />
            <Stack.Screen
                name='CameraScreen'
                component={CameraScreen}

                options={{
                    headerStyle: {
                        backgroundColor: "#f4f4f4",
                    },
                    title: ""
                }}
            />
            <Stack.Screen
                name='ReturnScreen'
                component={ReturnScreen}

                options={{
                    headerStyle: {
                        backgroundColor: "#f4f4f4",
                    },
                    title: ""
                }}
            />
            <Stack.Screen
                name='ViewMachine'
                component={ViewMachine}

                options={{
                    headerStyle: {
                        backgroundColor: "#f4f4f4",
                    },
                    title: ""
                }}
            />
            <Stack.Screen
                name='PickoutScreen'
                component={PickoutScreen}

                options={{
                    headerStyle: {
                        backgroundColor: "#f4f4f4",
                    },
                    title: ""
                }}
            />
            <Stack.Screen
                name='SuccessScreen'
                component={SuccessScreen}
                options={{ title: "" }}
            />

            <Stack.Screen
                name='ReadyScreen'
                component={ReadyScreen}
                options={{ title: "" }}
            />
            <Stack.Screen
                name='UploadedScreen'
                component={UploadedScreen}
                options={{ title: "" }}
            />
            <Stack.Screen
                name='GridScreen'
                component={GridScreen}
                options={{ title: "" }}
            />
            <Stack.Screen
                name='GridsScreen'
                component={GridsScreen}
                options={{ title: "" }}
            />

        </Stack.Navigator>
    );
};
export default MainStack;







// import * as React from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { TouchableOpacity } from 'react-native';

// //import SignInScreen from "../Screens/SignInScreen";
// import GridsScreen from '../Screens/GridsScreen';
// import GridScreen from '../Screens/GridScreen';
// import UploadedScreen from '../Screens/UploadedScreen';
// import ReadyScreen from '../Screens/ReadyScreen';
// import ViewMachine from '../Screens/ViewMachine';
// import SuccessScreen from '../Screens/SuccessScreen';
// import CameraScreen from '../Screens/CameraScreen'; 
// import HomeScreen from '../Screens/HomeScreen';
// import MachineScreen from '../Screens/MachineScreen';
// import PickoutScreen from '../Screens/PickoutScreen';
// import ReturnScreen from '../Screens/ReturnScreen';
// const Stack = createNativeStackNavigator();

// const MainStack = () => {
//     const navigation = useNavigation();
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name='HomeScreen'
//                 component={HomeScreen}
//                 options={{
//                     title: "",
//                 }}
//             />
//             <Stack.Screen
//                 name='MachineScreen'
//                 component={MachineScreen}
//                 options={{
//                     title: "",
//                 }}
//             />
//             <Stack.Screen
//                 name='CameraScreen'
//                 component={CameraScreen}

//                 options={{
//                     headerStyle: {
//                         backgroundColor: "#f4f4f4",
//                     },
//                     title: ""
//                 }}
//             />
//             <Stack.Screen
//                 name='ReturnScreen'
//                 component={ReturnScreen}

//                 options={{
//                     headerStyle: {
//                         backgroundColor: "#f4f4f4",
//                     },
//                     title: ""
//                 }}
//             />
//             <Stack.Screen
//                 name='ViewMachine'
//                 component={ViewMachine}

//                 options={{
//                     headerStyle: {
//                         backgroundColor: "#f4f4f4",
//                     },
//                     title: ""
//                 }}
//             />
//             <Stack.Screen
//                 name='PickoutScreen'
//                 component={PickoutScreen}

//                 options={{
//                     headerStyle: {
//                         backgroundColor: "#f4f4f4",
//                     },
//                     title: ""
//                 }}
//             />
//             <Stack.Screen
//                 name='SuccessScreen'
//                 component={SuccessScreen}
//                 options={{ title: "" }}
//             />

//             <Stack.Screen
//                 name='ReadyScreen'
//                 component={ReadyScreen}
//                 options={{ title: "" }}
//             />
//             <Stack.Screen
//                 name='UploadedScreen'
//                 component={UploadedScreen}
//                 options={{ title: "" }}
//             />
//             <Stack.Screen
//                 name='GridScreen'
//                 component={GridScreen}
//                 options={{ title: "" }}
//             />
//             <Stack.Screen
//                 name='GridsScreen'
//                 component={GridsScreen}
//                 options={{ title: "" }}
//             />
//         </Stack.Navigator>
//     )
// }
// export default MainStack;




// import * as React from "react";
// import { Icon } from "react-native-elements";
// import { useNavigation } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { TouchableOpacity, Text } from "react-native";
// import { useState, useEffect } from "react";

// import * as WebBrowser from "expo-web-browser";
// import * as AuthSession from "expo-auth-session";

// import SignInScreen from "../Screens/SignInScreen";
// import GridsScreen from '../Screens/GridsScreen';
// import GridScreen from '../Screens/GridScreen';
// import UploadedScreen from '../Screens/UploadedScreen';
// import ReadyScreen from '../Screens/ReadyScreen';
// import ViewMachine from '../Screens/ViewMachine';
// import SuccessScreen from '../Screens/SuccessScreen';
// import CameraScreen from '../Screens/CameraScreen'; 
// import HomeScreen from '../Screens/HomeScreen';
// import MachineScreen from '../Screens/MachineScreen';
// import PickoutScreen from '../Screens/PickoutScreen';
// import ReturnScreen from '../Screens/ReturnScreen';

// const Stack = createNativeStackNavigator();
// WebBrowser.maybeCompleteAuthSession();


// const tenetID = "b0c514e9-37f1-4eb4-be2e-1b12e639cf38";
// const clientID = "38523001-ecb4-4a66-ab0a-e677c8675474";
// const clientSecret = '677145ed-dede-4c01-9fa9-763c6939fd7a';


// const MainStack = () => {
//     const navigation = useNavigation();
//     const [username, setUsername] = useState('');
//     const [token, setToken] = useState('');
//     const [email, setEmail] = useState('');
//     const [discovery, setDiscovery] = useState([]);
//     const [authRequest, setAuthRequest] = useState([]);
//     const [authorizeResult, setAuthorizeResult] = useState(null);
    

//     const scopes = ["openid", "profile", "email", "offline_access"];
//     const domain = `https://login.microsoftonline.com/${tenetID}/v2.0`;
//     const redirectUrl = AuthSession.makeRedirectUri({
//         scheme: "exp",
//         useProxy: false,
//         host: "192.168.0.2:19000",
//       });

//     useEffect(() => {
//         const getSession = async () => {
//             try {
//                 const d = await AuthSession.fetchDiscoveryAsync(domain);
//                // console.log("Obj authSession",d)
//                 const authRequestOptions = {
//                     prompt: AuthSession.Prompt.Login,
//                     responseType: AuthSession.ResponseType.Code,
//                     scopes: scopes,
//                     usePKCE: true,
//                     clientId: clientID,
//                     redirectUri: redirectUrl,
//                 };
//                 const authRequest = new AuthSession.AuthRequest(authRequestOptions);
//                 //console.log("Auth request options:", authRequestOptions.scopes);
//                 setAuthRequest(authRequest);
//                 setDiscovery(d);
//                 //console.info("Discovery object:", d);

//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         getSession();
//     }, []);

//     useEffect(() => {
//         const getCodeExchange = async () => {
//             try {
//                 console.log('entro')
//                 const tokenResult = await AuthSession.exchangeCodeAsync({
//                     grant_type: "authorization_code",
//                     code: authorizeResult.params.code,
//                     client_id: clientID,
//                     client_secret: clientSecret,
//                     redirect_uri: redirectUrl,
//                     extraParams: {
//                         code_verifier: authRequest.codeVerifier || "",
//                     },
//                 }, 
//                 discovery,
//                 console.log('segunda entrada')
//                 );
//                 console.log('redirect_uri:', redirectUrl);
//                // console.log("Token scopes:", tokenResult);
//                 console.log('tecera entrada')

//                 const { access_token, refresh_token, expires_in } = tokenResult;
//                 console.log("Response accessToken from Graph v2", access_token);
//                 setToken(access_token)
//                 console.info(access_token)
//                 const response = await fetch(
//                     `https://graph.microsoft.com/v1.0/me`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${access_token}`,
//                         },
//                     }
//                 );
//                 console.log("Response from Graph API:", response);
//                 //givenName surname userPrincipalName id
//                 const responseJson = await response.json();
//                 // console.log("Access token scopes:", responseJson.scope);
//                 console.info(responseJson)
//                 const { givenName } = responseJson;

//                 setUsername(responseJson.givenName);
//                 // setEmail(responseJson.mail);
//                 // setId(responseJson.id);
//                 console.log(givenName)
//                 return navigation.navigate("HomeScreen");
//             } catch (error) {
//                 console.error("error capa 1 "+error);
//             }
//         };

//         if (authorizeResult && authorizeResult.type === "success" && authRequest) {
//             getCodeExchange();
//         }
//     }, [authorizeResult, authRequest, discovery, clientID, redirectUrl, navigation]);

//     return (
//         <Stack.Navigator>

//             {authorizeResult && authorizeResult.type === "success" ? (
//                 <Stack.Screen
//                     name="HomeScreen"
//                     component={HomeScreen}
//                     options={{
//                         title: "",
//                     }}
//                 />
//             ) : (
//                 <Stack.Screen
//                     name="SignInScreen"
//                     component={SignInScreen}
//                     options={{
//                         title: "",
//                         headerRight: () => (
//                             <TouchableOpacity
//                                 onPress={async () => {
//                                     const authorizeResult = await authRequest.promptAsync(
//                                         discovery
//                                     );
//                                     setAuthorizeResult(authorizeResult);
//                                 }}
//                             >
//                                 <Text>Sign In </Text>
//                             </TouchableOpacity>
//                         ),
//                     }}
//                 />

//             )}
//             <Stack.Screen
//                 name='MachineScreen'
//                 component={MachineScreen}
//                 options={{
//                     title: "",
//                 }}
//             />
//             <Stack.Screen
//                 name='CameraScreen'
//                 component={CameraScreen}

//                 options={{
//                     headerStyle: {
//                         backgroundColor: "#f4f4f4",
//                     },
//                     title: ""
//                 }}
//             />
//             <Stack.Screen
//                 name='ReturnScreen'
//                 component={ReturnScreen}

//                 options={{
//                     headerStyle: {
//                         backgroundColor: "#f4f4f4",
//                     },
//                     title: ""
//                 }}
//             />
//             <Stack.Screen
//                 name='ViewMachine'
//                 component={ViewMachine}

//                 options={{
//                     headerStyle: {
//                         backgroundColor: "#f4f4f4",
//                     },
//                     title: ""
//                 }}
//             />
//             <Stack.Screen
//                 name='PickoutScreen'
//                 component={PickoutScreen}

//                 options={{
//                     headerStyle: {
//                         backgroundColor: "#f4f4f4",
//                     },
//                     title: ""
//                 }}
//             />
//             <Stack.Screen
//                 name='SuccessScreen'
//                 component={SuccessScreen}
//                 options={{ title: "" }}
//             />

//             <Stack.Screen
//                 name='ReadyScreen'
//                 component={ReadyScreen}
//                 options={{ title: "" }}
//             />
//             <Stack.Screen
//                 name='UploadedScreen'
//                 component={UploadedScreen}
//                 options={{ title: "" }}
//             />
//             <Stack.Screen
//                 name='GridScreen'
//                 component={GridScreen}
//                 options={{ title: "" }}
//             />
//             <Stack.Screen
//                 name='GridsScreen'
//                 component={GridsScreen}
//                 options={{ title: "" }}
//             />

//         </Stack.Navigator>
//     );
// };
// export default MainStack;