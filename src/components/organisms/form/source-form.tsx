import * as React from 'react';
import { useForm } from 'react-hook-form';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import styles from './source-form.scss';
import { useStore } from 'src/store';
import { observer } from 'mobx-react-lite';

export interface IDataFormFirstStep {
  category: string;
  language: string;
}

export interface IDataFormSecondStep {
  country: string;
}

export type IDataForm = IDataFormSecondStep & IDataFormFirstStep;

const SourceFrom: React.FC = observer(() => {
  const { register, handleSubmit } = useForm<IDataForm>();
  const { sources } = useStore();

  const onSubmit = (data: IDataForm) => {
    sources.saveForm(data);
    sources.nextStep(data);
  };

  const renderFirstStep = () => (
    <div className={styles.block}>
      <fieldset>
        <label htmlFor="language">language</label>
        <input
          id="language"
          name="language"
          placeholder="language"
          type="text"
          ref={register({ required: false })}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="category">category</label>
        <input
          id="category"
          name="category"
          type="text"
          placeholder="category"
          ref={register({ required: false })}
        />
      </fieldset>
    </div>
  );

  const renderSecondStep = () => (
    <div className={styles.block}>
      <fieldset>
        <label htmlFor="country">country</label>
        <input
          id="country"
          name="country"
          placeholder="country"
          type="text"
          ref={register({ required: false })}
        />
      </fieldset>
    </div>
  );

  const renderSteps = () => {
    if (sources.form.step === 0) {
      return renderFirstStep();
    }
    return renderSecondStep();
  };

  const renderStepFields = () => (
    <SwitchTransition mode="out-in">
      <CSSTransition key={sources.form.step} classNames={{ ...styles }} timeout={250}>
        <div className={styles.block}>{renderSteps()}</div>
      </CSSTransition>
    </SwitchTransition>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderStepFields()}
      <button type="submit">Continue</button>
    </form>
  );
});

export default SourceFrom;
