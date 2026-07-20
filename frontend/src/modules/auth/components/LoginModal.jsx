import { GoogleLogin } from "@react-oauth/google";
import { googleLogin, getCurrentUser } from "@/modules/auth/services/authService";
import { setToken } from "@/shared/utils/token";

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
      const data = await googleLogin(credentialResponse.credential);
      setToken(data.accessToken || data.token);
      const profile = await getCurrentUser();

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
