// "app/components/Home/Adversing/page.tsx"
import styles from './Advertising.module.css'; // Importando o CSS Module
import Typical from 'react-typical';
import Image from 'next/image'; // Usar 'next/image' para otimização de imagens no Next.js

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
          {/* Usando o componente Image do Next.js e apontando diretamente para a pasta public */}
          <Image 
            src="/assets/img-propaganda.png" // ✅ Caminho direto (sem import)
            alt="Publicidade - Desconto" 
            width={500} // Especifique a largura (ajuste conforme necessário)
            height={300} // Especifique a altura (ajuste conforme necessário)
            objectFit="cover" // Ajuste de como a imagem será cortada se necessário
          />
        </div>
      </div>
    </section>
  );
};

export default Advertising;
