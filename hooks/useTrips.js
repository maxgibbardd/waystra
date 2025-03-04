import { useEffect, useState } from "react";
import { db } from "@/backend/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/backend/Auth";

/**
 * Custom hook to manage saving and loading trips from Firestore.
 * This hook abstracts Firestore operations for cleaner component logic.
 */
export function useTrips() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user trips from Firestore
  const fetchTrips = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const q = query(collection(db, "trips"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const userTrips = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTrips(userTrips);
    } catch (err) {
      console.error("Error fetching trips:", err);
    } finally {
      setLoading(false);
    }
  };

  // Save a new trip to Firestore and refresh the trip list
  const saveTrip = async (selections) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "trips"), {
        userId: user.uid,
        selections,
        savedAt: new Date().toLocaleString(),
      });
      await fetchTrips(); // Refresh trips after saving
    } catch (err) {
      console.error("Error saving trip:", err);
    }
  };

  // Fetch trips when user changes
  useEffect(() => {
    if (user) {
      fetchTrips();
    } else {
      setTrips([]);
    }
  }, [user]);

  return { trips, loading, saveTrip, fetchTrips };
}
