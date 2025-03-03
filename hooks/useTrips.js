/**
 * Custom hook to manage saving/loading trips from Firestore.
 * This demonstrates the approach; adapt as needed for your schema.
 */
import { useEffect, useState } from "react";
import { db } from "@/backend/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "@/backend/Auth";

export function useTrips() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user trips from Firestore
  async function fetchTrips() {
    if (!user) return; 
    setLoading(true);
    try {
      const q = query(collection(db, "trips"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const userTrips = [];
      querySnapshot.forEach(doc => {
        userTrips.push({ id: doc.id, ...doc.data() });
      });
      setTrips(userTrips);
    } catch (err) {
      console.error("Error fetching trips:", err);
    } finally {
      setLoading(false);
    }
  }

  // Save a new trip to Firestore
  async function saveTrip(selections) {
    if (!user) return;
    try {
      await addDoc(collection(db, "trips"), {
        userId: user.uid,
        selections,
        savedAt: new Date().toLocaleString()
      });
      // Then refetch the updated list
      await fetchTrips();
    } catch (err) {
      console.error("Error saving trip:", err);
    }
  }

  useEffect(() => {
    if (user) {
      fetchTrips();
    } else {
      setTrips([]);
    }
  }, [user]);

  return { trips, loading, saveTrip, fetchTrips };
}
