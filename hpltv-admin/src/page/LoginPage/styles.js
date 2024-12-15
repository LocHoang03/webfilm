import styled from 'styled-components';

export const DivContainer = styled.div`
  background-color: var(--login-bg);
  width: 100wh;
  height: 100vh;
  display: flex;
  align-items: center;
`;
export const DivContent = styled.div`
  width: 1000px;
  height: 600px;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: 0px 0px 20px 0 rgba(0, 0, 0, 0.6);
  text-align: center;
  color: var(--white);
  display: flex;
  overflow: hidden;
`;

export const ContentLogin = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 0 40px;
`;

export const DivLogo = styled.div`
  margin: 40px 0 20px;
  font-size: 24px;
  & h2 {
    margin: 0;
  }
`;
export const DivTitle = styled.div`
  margin-bottom: 20px;
  & h2 {
    font-weight: 500;
    margin: 0;
  }
`;
export const DivForm = styled.div`
  & label {
    color: var(--white) !important;
  }
`;

export const DivLink = styled.div`
  text-align: center;
  @media (max-width: 575px) {
    flex-direction: column !important;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  color: var(--white);
  margin-top: 10px;
  @media (max-width: 575px) {
    margin: 5px 0;
  }

  & a {
    color: var(--text-action);
    text-decoration: none;

    &:hover {
      color: var(--btn-form);
    }
  }
`;

export const DivImageLogin = styled.div`
  flex: 1;
`;

export const ImageLogin = styled.img`
  width: 100%;
  height: 100%;
`;

export const ErrorMessage = styled.div`
  margin-top: 5px;
  color: var(--color-error);
`;
