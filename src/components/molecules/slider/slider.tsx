import * as React from 'react';

import { observer } from 'mobx-react-lite';
import { CSSTransition } from 'react-transition-group';
import styles from './slider.scss';

interface ISliderComponentProps {
  isOpen?: boolean;
}

const Slider: React.FC<ISliderComponentProps> = ({ children, isOpen = false }) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const sliderRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && !sliderRef?.current?.contains(event.target as Node)) {
        handleToggle();
      }
    }

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  React.useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleToggle = () => {
    setIsVisible(state => !state);
  };

  return (
    <div className={styles.back} ref={sliderRef}>
      <CSSTransition
        in={isVisible}
        timeout={200}
        unmountOnExit
        classNames={{
          ...styles,
        }}
      >
        <section className={styles.wrapper}>
          <span className={styles.close} onClick={handleToggle}>
            ×
          </span>
          {children}
        </section>
      </CSSTransition>
    </div>
  );
};

export default observer(Slider);
