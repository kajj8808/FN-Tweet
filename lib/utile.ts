export function convertAuthErrorCodeToErrorMessage(errorCode: string) {
  console.log(errorCode);
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "이미 사용 중인 이메일입니다.";
    case "auth/invalid-credential":
      return "이메일 혹은 비밀번호가 일치하지 않습니다.";
    case "auth/account-exists-with-different-credential":
      return "이미 사용 중인 이메일입니다. 로그인 후 연동해 주세요.";
    default:
      return "알 수 없는 이유로 로그인/회원가입에 실패했습니다.";
  }
}
