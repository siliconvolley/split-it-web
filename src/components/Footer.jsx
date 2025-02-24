import { FaGithub } from 'react-icons/fa'

function Footer() {
  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, padding: '10px' }}>
      <a href="https://github.com/siliconvolley/split-it-web" target="_blank" rel="noopener noreferrer">
        <FaGithub size={30} />
      </a>
    </div>
  )
}

export default Footer;