import { GoogleLogin } from "@react-oauth/google";

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}) {

  if (!isOpen) return null;

  const handleGoogleSuccess = async (
    credentialResponse
  ) => {

    try {

      const response = await fetch(
        "http://localhost:8080/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idToken: credentialResponse.credential
          })
        }
      );

      const data = await response.json();

      localStorage.setItem(
        "token",
        data.accessToken
      );

      const profileResponse = await fetch(
        "http://localhost:8080/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`
          }
        }
      );

      const profile =
        await profileResponse.json();

      onLoginSuccess(profile);

      onClose();

    } catch (error) {

      console.error(
        "Login Failed",
        error
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="bg-white rounded-xl p-8 shadow-xl">

        <h2 className="mb-4 text-xl font-bold">
          Sign In
        </h2>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() =>
            console.log(
              "Google Login Failed"
            )
          }
        />

        <button
          onClick={onClose}
          className="mt-4 text-sm"
        >
          Close
        </button>

      </div>

    </div>
  );
}