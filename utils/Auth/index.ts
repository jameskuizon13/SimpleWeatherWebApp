import * as AuthSessionNew from "expo-auth-session";
import jwtDecode from "jwt-decode";
import { words } from "lodash/fp";

interface StringMap {
  [key: string]: string | boolean;
}

const toQueryString = (params: StringMap) =>
  "?" +
  Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

const logout = async () => {
  // return AuthSession.dismiss();
};

const login = async () => {
  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  const redirectUrl = AuthSessionNew.getRedirectUrl();
  console.log("redirectUrl: ", redirectUrl);

  // Structure the auth parameters and URL
  const params = {
    client_id: "aX1iqJ2aX9Dpx3T6RgbMJbuoWvW9X7yj",
    redirect_uri: redirectUrl,
    // response_type:
    // id_token will return a JWT token with the profile as described on the scope
    // token will return access_token to use with further api calls
    response_type: "token id_token",
    nonce: "nonce", // ideally, this will be a random value
    rememberLastLogin: true,
  };

  const queryParams = toQueryString(params);
  const authUrl = `https://jhamezzz1315.au.auth0.com/authorize${queryParams}`;

  // const response = await WebBrowser.openBrowserAsync(authUrl, {showInRecents: true});
  // const response = await WebBrowser.openAuthSessionAsync(authUrl, {showInRecents: true});
  const response = await AuthSessionNew.startAsync({
    authUrl,
    showInRecents: true,
  });

  // const response = await startAuth(authUrl);
  return handleLoginResponse(response);
};

const handleLoginResponse = (response: any) => {
  if (response.error || response.type !== "success") {
    return;
  }
  console.log("handleLoginResponse: ", response);

  const decodedJwtIdToken: any = jwtDecode(response.params.id_token);
  console.log("decodedJwtIdToken: ", decodedJwtIdToken);
  const fullName = decodedJwtIdToken["https://jhamezzz1315.au.auth0.com/name"];
  return {
    ...decodedJwtIdToken,
    name: fullName,
    firstName: words(fullName)[0],
    meta: decodedJwtIdToken["https://jhamezzz1315.au.auth0.com"],
    primaryUserId: decodedJwtIdToken.sub,
  };
};

export default { login, logout };
