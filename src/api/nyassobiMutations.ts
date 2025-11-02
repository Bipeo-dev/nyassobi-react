import { gql } from "@apollo/client";

export interface SendNyassobiContactMessageInput {
  fullname: string;
  email: string;
  subject: string;
  message: string;
  token?: string | null;
}

export interface SendNyassobiContactMessageResponse {
  sendNyassobiContactMessage: {
    success: boolean;
    message: string;
  };
}

export const SEND_NYASSOBI_CONTACT_MESSAGE = gql`
  mutation SendNyassobiContactMessage($input: SendNyassobiContactMessageInput!) {
    sendNyassobiContactMessage(input: $input) {
      success
      message
    }
  }
`;
