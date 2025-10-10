import { LINE_API } from './constants'

export interface LineProfile {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

export interface LineTokenResponse {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  scope: string
}

export class LineAPIClient {
  private channelId: string
  private channelSecret: string
  private accessToken: string

  constructor(channelId: string, channelSecret: string, accessToken?: string) {
    this.channelId = channelId
    this.channelSecret = channelSecret
    this.accessToken = accessToken || ''
  }

  async exchangeCodeForToken(code: string, redirectUri: string): Promise<LineTokenResponse> {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: this.channelId,
      client_secret: this.channelSecret
    })

    const response = await fetch(LINE_API.TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    })

    if (!response.ok) {
      throw new Error('Failed to exchange code for token')
    }

    return response.json()
  }

  async getProfile(accessToken: string): Promise<LineProfile> {
    const response = await fetch(LINE_API.PROFILE_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get LINE profile')
    }

    return response.json()
  }

  async sendMessage(userId: string, message: string): Promise<void> {
    const response = await fetch(`${LINE_API.MESSAGING_URL}/push`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      },
      body: JSON.stringify({
        to: userId,
        messages: [{
          type: 'text',
          text: message
        }]
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send LINE message')
    }
  }

  async sendFlexMessage(userId: string, flexMessage: any): Promise<void> {
    const response = await fetch(`${LINE_API.MESSAGING_URL}/push`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      },
      body: JSON.stringify({
        to: userId,
        messages: [{
          type: 'flex',
          altText: flexMessage.altText || 'Flex Message',
          contents: flexMessage
        }]
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send LINE flex message')
    }
  }

  async broadcast(message: string): Promise<void> {
    const response = await fetch(`${LINE_API.MESSAGING_URL}/broadcast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      },
      body: JSON.stringify({
        messages: [{
          type: 'text',
          text: message
        }]
      })
    })

    if (!response.ok) {
      throw new Error('Failed to broadcast LINE message')
    }
  }

  getLoginUrl(redirectUri: string, state?: string): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.channelId,
      redirect_uri: redirectUri,
      state: state || '',
      scope: 'profile openid'
    })

    return `${LINE_API.LOGIN_URL}?${params.toString()}`
  }
}