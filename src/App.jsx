import BlobBackground from './components/BlobBackground'
import EmojiField from './components/EmojiField'
import SorryHero from './components/SorryHero'
import HerPhoto from './components/HerPhoto'
import SorryCascade from './components/SorryCascade'
import LoveLetter from './components/LoveLetter'
import SorryReasons from './components/SorryReasons'
import Promises from './components/Promises'
import HugKissSection from './components/HugKissSection'
import ForgiveSection from './components/ForgiveSection'
import MusicPlayer from './components/MusicPlayer'
import './App.css'

export default function App() {
  return (
    <>
      <BlobBackground />
      <EmojiField />
      <MusicPlayer />
      <main>
        <SorryHero />
        <HerPhoto />
        <SorryCascade />
        <LoveLetter />
        <SorryReasons />
        <Promises />
        <HugKissSection />
        <ForgiveSection />
        <footer>made with a very sorry heart 🥺💗</footer>
      </main>
    </>
  )
}
