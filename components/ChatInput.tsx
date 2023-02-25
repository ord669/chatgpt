'use client'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { Session } from 'inspector'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { db } from '../firebase'

type Props = {
    chatId: string
}
function ChatInput({ chatId }: Props) {
    const [prompt, setPrompt] = useState('')
    const { data: session } = useSession()

    //!use swr to get model

    const model = 'text-devinci-003'

    const sendMsg = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!prompt) return

        const input = prompt.trim()
        setPrompt('')

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
            message
        )

        //Toast notification

        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            })
        }).then(() => {
            // Toast notification sucsses
        })

    }

    return (
        <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm'>
            <form onSubmit={sendMsg} className='p-5 space-x-5 flex' >
                <input
                    className='bg-transparent focus:outline-none  flex-1 disabled:cursor-not-allowed disabled:text-gray-300'
                    disabled={!session}
                    type="text"
                    placeholder='type your message'
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                />

                <button type='submit' disabled={!session || !prompt}
                    className='bg-[#11a37f] hover:opacity-50 text-white font-bold px-4 py-2 rounded
                    disabled:bg-gray-300 disabled:cursor-not-allowed'
                >

                    <PaperAirplaneIcon className='h-4 w-4 -rotate-45' />
                </button>
            </form>

            <div>
                {/* {models selection} */}
            </div>
        </div>
    )
}

export default ChatInput