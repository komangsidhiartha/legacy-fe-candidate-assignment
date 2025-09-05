// @ts-ignore
import React, {MouseEventHandler, useEffect, useState} from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { getSigner } from '@dynamic-labs/ethers-v6'
import { useConnectWithOtp } from '@dynamic-labs/sdk-react-core'
import Button from "./components/Button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./components/Card"
import Badge from "./components/Badge"
import TextArea from "./components/TextArea"

interface SignedMessage {
  message: string
  signature: string
  signer: string
  isValid: boolean
  copied: boolean
}

interface Toast {
  id: number
  variant: string
  title: string
  description: string
}

const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  // @ts-ignore
  const toast = ({ title, description, variant = 'default' }) => {
    const id = Date.now()
    const newToast = { id, title, description, variant }
    // @ts-ignore
    setToasts((prev) => [...prev, newToast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  const ToastContainer = () => (
    <div className='toast-container'>
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.variant}`}>
          <div className='toast-title'>{toast.title}</div>
          <div className='toast-description'>{toast.description}</div>
        </div>
      ))}
    </div>
  )

  return { toast, ToastContainer }
}

// Icons (simple SVG implementations)
const LogOutIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
    <polyline points='16,17 21,12 16,7' />
    <line x1='21' y1='12' x2='9' y2='12' />
  </svg>
)

const ShieldIcon = () => (
  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
  </svg>
)

const CopyIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
    <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
  </svg>
)

const CheckIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <polyline points='20,6 9,17 4,12' />
  </svg>
)


function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { connectWithEmail, verifyOneTimePassword } = useConnectWithOtp()
  const { primaryWallet, handleLogOut } = useDynamicContext()
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState<SignedMessage[]>(() => {
    // Lazy initialization: runs only once
    const saved = localStorage.getItem('signedHistory')
    return saved ? JSON.parse(saved) : []
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)

  const { toast, ToastContainer } = useToast()

  useEffect(() => {
    localStorage.setItem('signedHistory', JSON.stringify(history))

  }, [history])


  const handleSign = async () => {
    if (!message || !primaryWallet) return

    setIsLoading(true)
    try {
      const signer = await getSigner(primaryWallet)
      const signature = await signer.signMessage(message)

      const res = await fetch(`${backendUrl}/verify-signature`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature }),
      })

      const data = await res.json()
      setHistory([{ message, signature, signer: data.signer, isValid: data.isValid, copied: false }, ...history])
    } catch (error) {
      console.error('Error signing message:', error)
    }
    setMessage('')
    setIsLoading(false)
  }

  // @ts-ignore
  const handleLogin = async (event) => {
    setIsLoggingIn(true)
    try {
      event.preventDefault()

      const email = event.currentTarget.email.value

      await connectWithEmail(email)
      toast({
        title: 'Login',
        description: 'Check your inbox for login code!',
      })
      setEmail(email)
      setIsSubmittingEmail(true)
    } catch (err) {
      console.error('Login failed:', err)
    }
    setIsLoggingIn(false)
  }

  // @ts-ignore
  const handleOtp = async (event) => {
    try {
      event.preventDefault()

      const otp = event.currentTarget.otp.value

      await verifyOneTimePassword(otp)
      toast({
        title: 'Login',
        description: 'Logged in successfully',
      })
      setIsSubmittingEmail(false)
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  const logOut = async () => {
    try {
      await handleLogOut()
      toast({
        title: 'Log Out',
        description: 'You are logged out',
      })
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  // @ts-ignore
  const onMessageChange = (event) => {
    setMessage(event.target.value)
  }

  const copyToClipboard = async (index: number) => {
    await navigator.clipboard.writeText(history[index].signature)
    history[index].copied = true
    setTimeout(() => history[index].copied = false, 2000)
    toast({
      title: 'Copied',
      description: 'Signature copied to clipboard',
    })
  }

  // @ts-ignore
  return (
    <div className='app'>
      <ToastContainer />

      {/* Header */}
      <header className='header'>
        <div className='header-content'>
          <div className='header-left'>
            <div className='logo'>
              <ShieldIcon />
            </div>
            <h1 className='app-title'>SignatureVault</h1>
          </div>

          {primaryWallet && (
            <div className='header-right'>
              <Badge variant='secondary' className='wallet-badge'>
                {primaryWallet.address.slice(0, 6)}...{primaryWallet.address.slice(-4)}
              </Badge>
              <Button disabled={false} variant='outline' size='sm' onClick={logOut} className='disconnect-btn bg-transparent'>
                <LogOutIcon />
                Disconnect
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className='main-content'>
        <div className='hero-section'>
          <h2 className='hero-title'>Secure Message Signing</h2>
          <p className='hero-description'>Connect your wallet and sign messages securely using Web3 technology</p>
        </div>

        {!primaryWallet ? (
          /* Authentication Panel */
          <Card className='auth-card'>
            <CardHeader>
              <CardTitle className='auth-title'>
                Login to your Account
              </CardTitle>
              <CardDescription>Login via Dynamic.xyz to start signing messages</CardDescription>
            </CardHeader>
            <CardContent className='auth-content'>
              <div>
                { !isSubmittingEmail &&
                  <form className='' key='email-form' onSubmit={handleLogin}>
                    <input className='email-input' type='email' name='email' placeholder='Email'
                           disabled={isSubmittingEmail}/>
                    <Button type='submit' onClick={() => {}} size='lg' className='connect-btn' disabled={isSubmittingEmail}>Submit</Button>
                  </form>
                }
                {isSubmittingEmail &&
                  <form key='otp-form' onSubmit={handleOtp}>
                    <p>{email}</p>
                    <input className='text-input' type='text' name='otp' placeholder='OTP' disabled={!isSubmittingEmail} />
                    <Button onClick={() => {}} disabled={!isSubmittingEmail} type='submit' size='lg' className='connect-btn'>Submit</Button>
                  </form>
                }
              </div>

              <div className='connection-status'>
                <div className={`status-dot ${isLoggingIn ? 'connecting' : ''}`} />
                <span className='status-text'>{isLoggingIn ? 'Connecting to wallet...' : 'Ready to connect'}</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Message Signing Panel */
          <div className='signing-section'>
            <Card>
              <CardHeader>
                <CardTitle className='signing-title'>
                  <ShieldIcon />
                  Sign Message
                </CardTitle>
                <CardDescription>Enter your message below to create a cryptographic signature</CardDescription>
              </CardHeader>
              <CardContent className='signing-content'>
                <div className='message-input-group'>
                  <label htmlFor='message' className='input-label'>
                    Message to Sign
                  </label>
                  <TextArea
                    id='message'
                    placeholder='Enter your message here...'
                    value={message}
                    onChange={onMessageChange}
                    className='message-textarea'
                  />
                </div>

                <Button onClick={handleSign} disabled={isLoading || !message.trim()} className='sign-btn' size='lg'>
                  {isLoading ? (
                    <>
                      <div className='spinner' />
                      Signing Message...
                    </>
                  ) : (
                    <>
                      <ShieldIcon />
                      Sign Message
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {history.map((h, i) => (
              <Card key={i} className='signature-card'>
                <CardHeader>
                  <CardTitle className='signature-title'>Signed Message</CardTitle>
                  <CardDescription>Your cryptographic signature has been generated</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='signature-container'>
                    <div className='signature-text'>
                      <p><strong>Message:</strong> {h.message}</p>
                      <p><strong>Signature:</strong> {h.signature.slice(0, 20)}...</p>
                      <p><strong>Signer:</strong> {h.signer}</p>
                      <p><strong>Valid:</strong> {h.isValid ? '✅' : '❌'}</p>
                    </div>
                    <Button disabled={false} variant='outline' size='sm' onClick={() => copyToClipboard(i)} className='copy-btn bg-transparent'>
                      {h.copied ? (
                        <>
                          <CheckIcon />
                          Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
