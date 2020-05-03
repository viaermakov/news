import * as React from 'react';

import { observer } from 'mobx-react-lite';
import cls from 'classnames';
import { CSSTransition } from 'react-transition-group';
import styles from './slider.scss';

// interface IArticlesComponentProps {}

const Slider: React.FC = observer(({ children }) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  const [showButton, setShowButton] = React.useState<boolean>(false);

  const handleShow = () => {
    setIsVisible(state => !state);
  };

  const renderShowButton = () => (
    <span className={cls(styles.cc, { [styles.hidden]: !showButton })} onClick={handleShow}>
      Show
    </span>
  );

  return (
    <>
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
    </>
  );
});

export default Slider;
