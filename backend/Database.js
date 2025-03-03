import { doc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { database } from "./Firebase";



export async function saveTrip(userId, tripData) {
    if (!userId) {
        console.error("❌ ERROR: Missing userId");
        return;
    }

    try {
        const tripRef = doc(collection(database, "users", userId, "trips"));
        console.log("📝 Saving trip at path:", tripRef.path);

        await setDoc(tripRef, { ...tripData, id: tripRef.id });
        console.log("✅ Trip saved successfully!");
    } catch (error) {
        console.error("❌ Firestore Error:", error);
    }
}


export async function fetchUserTrips(userId) {
  if (!userId) {
      console.error("❌ ERROR: No userId provided.");
      return [];
  }

  try {
      console.log(`🔄 Fetching trips for user: ${userId}`);
      const tripsRef = collection(database, "users", userId, "trips");
      const tripSnapshot = await getDocs(tripsRef);

      if (tripSnapshot.empty) {
          console.warn("⚠️ No trips found.");
          return [];
      }

      const trips = tripSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
      }));

      console.log("✅ Fetched trips:", trips);
      return trips;
  } catch (error) {
      console.error("❌ Firestore Fetch Error:", error);
      return [];
  }
}


/**
 * Deletes a trip from Firestore.
 * @param {string} userId - The ID of the authenticated user.
 * @param {string} tripId - The Firestore document ID of the trip.
 */
export async function deleteTrip(userId, tripId) {
    if (!userId || !tripId) return;

    try {
        const tripRef = doc(database, "users", userId, "trips", tripId);
        await deleteDoc(tripRef);
        console.log("✅ Trip deleted successfully from Firestore!");
    } catch (error) {
        console.error("❌ Error deleting trip:", error);
    }
}
