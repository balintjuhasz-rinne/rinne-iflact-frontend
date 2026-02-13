import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Step1 from './step-1';
import Step2 from './step-2';
import { setUserByToken } from '../../actions/user.actions';
import { normalizeError } from '../../helpers/functions.helper';
import { showModal } from '../../actions/modal.actions';
import { ERROR_MODAL } from '../../constants/modal.constants';
import PageLoader from '../../components/page-loader';
import { getUserSelector } from '../../selectors/user.selectors';
import s from './verify-data-panel.module.scss';
import Link from '../../components/custom-link';
import Button from '../../components/buttons/primary-button';
import { SIGNIN_PATH, SIGNUP_PATH } from '../../constants/router.constants';
import { CLIENT_ERRORS } from '../../constants/error.constants';
import Gdpr from '../../components/gdpr';

const VerifyDataPanel = () => {

  const [step, setStep] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isGdprActive, setIsGdprActive] = useState(false);
  const [gdprError, setGdprError] = useState();
  const { user } = useSelector(getUserSelector);
  const dispatch = useDispatch();

  const router = useRouter();

  const onConfirm = () => {
    if (!isGdprActive) {
      setGdprError(CLIENT_ERRORS.GDPR);
      return;
    }
    router.push(SIGNUP_PATH);
  };

  const isFirstStep = useMemo(() => step === 1, [step]);

  const setNextStep = () => {
    if (!isGdprActive) {
      setGdprError(CLIENT_ERRORS.GDPR);
      return;
    }
    setStep(2);
  };

  useEffect(() => {
    const token = router?.asPath?.split('/')[2];
    (async () => {
      try {
        setLoading(true);
        await dispatch(setUserByToken(token));
      } catch (err) {
        const error = normalizeError(err);
        dispatch(showModal(ERROR_MODAL, { error }));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && <PageLoader />}
      <div className={s.verifyDataPanel}>
        <>
          <h5 className={s.title}>Verify Your {isFirstStep ? 'Personal Data' : 'Company List'}</h5>
          <div className={s.body}>
            {isFirstStep
              ? (
                <>
                  <Step1 user={user} />
                  <div className={s.gdpr}>
                    <Gdpr isActive={isGdprActive} changeState={setIsGdprActive} />
                    {gdprError && <span className={s.error}>{gdprError}</span>}
                  </div>
                </>
              ) : <Step2 workplaces={user.workplaces} />}
            <div className={s.bottomLine}>
              <div className={s.signInBlock}>
                <span className={s.signInText}>Have an account? </span>
                <Link className={s.signInLink} href={SIGNIN_PATH} isScroll={false}>Sign in</Link>
              </div>
              {user.workplaces.length === 1
                ? <Button value="Confirm data" className={s.button} onClick={onConfirm} />
                : isFirstStep ? <Button value="Next" className={s.button} onClick={() => setNextStep()} />
                  : (
                    <>
                      <Button theme="transparent" value="Back" className={cn(s.button, s.back)} onClick={() => setStep(1)} />
                      <Button value="Confirm data" className={s.button} onClick={onConfirm} />
                    </>
                  )}
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default VerifyDataPanel;
