import '../globals.css'

import { motion } from "framer-motion";


export default function PhotoAlbum() {
  return (
    <div className="photo-album">
      <h1
        className="mt-12 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-center text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
      >
        SACCMCT '25 Photo Album
      </h1>

      <div className="iframe-container">
        <iframe
          src="https://drive.google.com/embeddedfolderview?id=1qnWEt3pqO1cfEhFM_bxdfzZ0Ogx96GJA#grid"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
