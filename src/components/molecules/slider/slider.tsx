import * as React from 'react';

import { observer } from 'mobx-react-lite';
import cls from 'classnames';
import { CSSTransition } from 'react-transition-group';
import styles from './slider.scss';

interface ISliderComponentProps {
  isOpen?: boolean;
}

const Slider: React.FC<ISliderComponentProps> = ({ children, isOpen = false }) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(isOpen);
  const [showButton, setShowButton] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleShow = () => {
    setIsVisible(state => !state);
  };

  const renderShowButton = () => (
    <span className={cls(styles.cc, { [styles.hidden]: !showButton })} onClick={handleShow}>
      Show
    </span>
  );

  return (
    <div className={styles.back}>
      <CSSTransition
        in={isVisible}
        timeout={200}
        unmountOnExit
        classNames={{
          ...styles,
        }}
        onExited={() => setShowButton(true)}
        onEnter={() => setShowButton(false)}
      >
        <section className={styles.wrapper}>
          <span className={styles.close} onClick={handleShow}>
            ×
          </span>
          {children}
        </section>
      </CSSTransition>
      {renderShowButton()}
    </div>
  );
};

export default observer(Slider);
