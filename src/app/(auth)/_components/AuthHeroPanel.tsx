import Image from 'next/image';

export function AuthHeroPanel() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 text-center">
      <Image
        alt="Hero Image"
        fill
        style={{ objectFit: 'cover' }}
        src="https://images.unsplash.com/photo-1614367674345-f414b2be3e5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltJTIwd29ya291dCUyMGRhcmslMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcyODk3NzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral alt="
      />
      <h1>Welcome to Auth</h1>
      <p>Sign up or log in to access your account</p>
    </div>
  );
}
