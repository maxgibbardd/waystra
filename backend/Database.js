import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { app } from "./Firebase";

// Initialize Firestore
const db = getFirestore(app);

/**
 * Fetches all user trips from Firestore
 */
export const fetchUserTrips = async (userId) => {
  console.log("🔄 Fetching trips for user:", userId);
  try {
    const tripsRef = collection(db, `users/${userId}/trips`);
    const querySnapshot = await getDocs(tripsRef);

    const trips = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("✅ Fetched trips: ", trips);
    return trips;
  } catch (error) {
    console.error("❌ Error fetching trips:", error);
    return [];
  }
};

/**
 * Saves a trip to Firestore
 */
export const saveTrip = async (userId, tripData) => {
  try {
    const tripRef = doc(collection(db, `users/${userId}/trips`));
    await setDoc(tripRef, tripData);
    console.log(`✅ Trip saved successfully!`);
  } catch (error) {
    console.error("❌ Error saving trip:", error);
  }
};

/**
 * Deletes a trip from Firestore
 */
export const deleteTrip = async (userId, tripId) => {
  try {
    const tripRef = doc(db, `users/${userId}/trips/${tripId}`);
    await deleteDoc(tripRef);
    console.log("✅ Trip deleted successfully from Firestore!");
  } catch (error) {
    console.error("❌ Error deleting trip:", error);
  }
};

/**
 * Updates AI-generated data for a trip in Firestore
 */
export const updateTripAiData = async (userId, tripId, aiData) => {
  try {
    const tripRef = doc(db, `users/${userId}/trips/${tripId}`);
    await updateDoc(tripRef, { aiData });

    console.log(`✅ AI data saved for trip: ${tripId}`);
  } catch (error) {
    console.error("❌ Error updating AI data:", error);
  }
};
