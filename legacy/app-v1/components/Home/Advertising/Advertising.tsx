// "app/components/Home/Adversing/page.tsx"

import styles from './Advertising.module.css';
import Typical from 'react-typical';
import Image from 'next/image';

const Advertising: React.FC = () => {
  return (
    <section className={styles.sectionAdvertising}>
      <div className={styles.containerAdvertising}>
        <div className={styles.advertising}>
          <h1>Até 50% de desconto e com muitas promoções.</h1>
          <br />
          <h1 className={styles.typical}>
            <Typical 
              loop={Infinity} 
              steps={[
                'Preço Baixo!',
                3000,
                'Aproveite!',
                3000,
                'Compre Agora!',
                3000,
              ]}
            />
          </h1>
        </div>
        <div className={styles.imgAdvertising}>
          <Image 
            src="/assets/img-propaganda.png"
            alt="Publicidade - Desconto" 
            width={500}
            height={300}
            objectFit="cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Advertising;
