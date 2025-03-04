import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { app } from "./Firebase";

// Initialize Firestore
const db = getFirestore(app);

/**
 * Fetches all trips saved by a specific user from Firestore.
 */
export const fetchUserTrips = async (userId) => {
  console.log(`Fetching trips for user: ${userId}`);
  try {
    const tripsRef = collection(db, `users/${userId}/trips`);
    const querySnapshot = await getDocs(tripsRef);
    
    const trips = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    console.log(`Retrieved ${trips.length} trips successfully.`);
    return trips;
  } catch (error) {
    console.error(`Error fetching trips: ${error.message}`);
    return [];
  }
};

/**
 * Saves a new trip to Firestore under the user's collection.
 */
export const saveTrip = async (userId, tripData) => {
  try {
    const tripRef = doc(collection(db, `users/${userId}/trips`));
    await setDoc(tripRef, tripData);
    console.log(`Trip saved successfully (ID: ${tripRef.id}).`);
  } catch (error) {
    console.error(`Failed to save trip: ${error.message}`);
  }
};

/**
 * Deletes a trip from Firestore.
 */
export const deleteTrip = async (userId, tripId) => {
  try {
    const tripRef = doc(db, `users/${userId}/trips/${tripId}`);
    await deleteDoc(tripRef);
    console.log(`Trip deleted successfully (ID: ${tripId}).`);
  } catch (error) {
    console.error(`Error deleting trip: ${error.message}`);
  }
};

/**
 * Updates AI-generated data for a specific trip in Firestore.
 */
export const updateTripAiData = async (userId, tripId, aiData) => {
  try {
    const tripRef = doc(db, `users/${userId}/trips/${tripId}`);
    await updateDoc(tripRef, { aiData });
    console.log(`AI data updated for trip ID: ${tripId}`);
  } catch (error) {
    console.error(`Error updating AI data: ${error.message}`);
  }
};
