import { useEffect, useState } from "react"; 
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";


export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const tokenResult = await getIdTokenResult(firebaseUser);
        setUser({
          ...firebaseUser,
          isAdmin: tokenResult.claims.isAdmin || false, // ✅ use isAdmin
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};
