// pages/index.tsx
import { useRouter } from 'next/router';
import GlitchIntro from '@/components/GlitchIntro';

export default function Index() {
  const router = useRouter();

  const handleFinishIntro = () => {
    router.push('/loading');
  };

  return <GlitchIntro onFinish={handleFinishIntro} />;
}
