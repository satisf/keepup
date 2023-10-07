import {AWS_REGION, APP_CLIENT_ID, USER_POOL_ID} from '@env';

export const config = {
  Auth: {
    region: AWS_REGION, // (required) - Region where Amazon Cognito project was created
    userPoolId: USER_POOL_ID, // (optional) -  Amazon Cognito User Pool ID
    userPoolWebClientId: APP_CLIENT_ID, // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
    mandatorySignIn: 'enable', // (optional) - Users are not allowed to get the aws credentials unless they are signed in
  },
};
