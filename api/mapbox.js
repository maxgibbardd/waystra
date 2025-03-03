import React, { useState } from "react";
import axios from "axios";

const [searchTerm, setSearchTerm] = useState("")
const [locations, setLocations] = useState([])

const fetchLocations = async (query) => {
    if (!query) return;

    try {
        const response = await axios.get(
            
        )
    }
}