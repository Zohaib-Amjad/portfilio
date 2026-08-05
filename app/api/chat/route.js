import { NextResponse } from 'next/server'
import { answerChat } from '@/lib/chatService'

export async function POST(request) {
  try {
    const body = await request.json()
    const message = String(body?.message || '').trim()
    const history = Array.isArray(body?.history) ? body.history : []

    if (!message) {
      return NextResponse.json(
        { success: false, message: 'Please type a question.' },
        { status: 422 },
      )
    }

    if (message.length > 500) {
      return NextResponse.json(
        { success: false, message: 'Please keep questions under 500 characters.' },
        { status: 422 },
      )
    }

    const { reply, mode } = await answerChat({ message, history })

    return NextResponse.json({
      success: true,
      reply,
      mode,
    })
  } catch (error) {
    console.error('[chat]', error)
    return NextResponse.json(
      { success: false, message: 'Chat is temporarily unavailable.' },
      { status: 500 },
    )
  }
}
