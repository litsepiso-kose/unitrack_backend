import { ApplicationDataModel } from "../models/applicationData.js";

const data = [
    {
        "name": "Access Trust Bursary",
        "description": "Supports students at Western Cape TVET colleges, covering tuition and registration fees.",
        "type": 0,
        "deadline": "November 30, 2024",
        "courses": null,
        "apply_link": "https://accesstrust.org.za"
    },
    {
        "name": "CSIR Bursary",
        "description": "Funds full-time studies in science, engineering, and technology fields for South African students.",
        "type": 0,
        "deadline": "December 31, 2024",
        "courses": null,
        "apply_link": "https://www.csir.co.za/bursary-programme"
    },
    {
        "name": "MultiChoice Bursary",
        "description": "Provides bursaries to South African students pursuing media, film, and related fields.",
        "type": 0,
        "deadline": "March 31, 2024",
        "courses": null,
        "apply_link": "https://bursary.multichoice.com"
    },
    {
        "name": "University of Alberta Domestic Supplementary Bursary",
        "description": "Provides financial aid to Canadian students in need to cover living and tuition costs.",
        "type": 0,
        "deadline": "December 15, 2024; April 15, 2025; June 15, 2025",
        "courses": null,
        "apply_link": "https://www.ualberta.ca/financial-support/domestic-supplementary-bursary"
    },
    {
        "name": "Allan Gray Orbis Fellowship",
        "description": "Supports entrepreneurial-minded students in South Africa across multiple disciplines.",
        "type": 0,
        "deadline": "April 30, 2024",
        "courses": null,
        "apply_link": "https://www.allangrayorbis.org/fellowship/"
    },
    {
        "name": "University of Cape Town",
        "description": "A leading South African university offering various undergraduate and postgraduate programs.",
        "type": 1,
        "deadline": "September 30, 2024",
        "courses": ["Engineering", "Health Sciences", "Commerce", "Humanities", "Science"],
        "apply_link": "https://applyonline.uct.ac.za"
    },
    {
        "name": "University of Pretoria",
        "description": "Offers a wide range of programs with a focus on research and innovation.",
        "type": 1,
        "deadline": "May 31, 2024",
        "courses": ["Agricultural Sciences", "Law", "Engineering", "Education", "Medicine"],
        "apply_link": "https://www.up.ac.za/apply"
    },
    {
        "name": "University of Johannesburg",
        "description": "Known for practical and career-oriented programs in multiple fields.",
        "type": 1,
        "deadline": "October 31, 2024",
        "courses": ["Engineering", "Business Management", "Science", "Arts", "Humanities"],
        "apply_link": "https://www.uj.ac.za/admissions"
    },
    {
        "name": "University of Witwatersrand",
        "description": "Offers comprehensive programs and is known for its focus on innovation.",
        "type": 1,
        "deadline": "August 31, 2024",
        "courses": ["Architecture", "Medicine", "Engineering", "Humanities", "Law"],
        "apply_link": "https://www.wits.ac.za/applications"
    },
    {
        "name": "University of the Western Cape",
        "description": "A public university offering affordable, quality education in diverse fields.",
        "type": 1,
        "deadline": "September 30, 2024",
        "courses": ["Social Sciences", "Natural Sciences", "Dentistry", "Public Health", "Law"],
        "apply_link": "https://www.uwc.ac.za/apply"
    }
]

export async function addInitialData() {
    await addInitialDataParamed(data);
}

export async function addInitialDataParamed(array: Array<{
    name: string;
    description: string;
    type: number;
    deadlines?: string;
    courses?: string[];
    apply_link: string;
}>) {
    try {
        // Check if there are already any documents in the database
        const existingDataCount = await ApplicationDataModel.countDocuments();

        // Only add initial data if the collection is empty
        if (existingDataCount === 0) {
            for (const item of array) {
                const deadline = item.deadlines || "Not specified";

                // Create a new document using the ApplicationDataModel
                const newData = new ApplicationDataModel({
                    name: item.name,
                    description: item.description,
                    type: item.type,
                    deadline: deadline,
                    courses: item.courses,
                    applyLink: item.apply_link,
                });

                // Save the document to the database
                await newData.save();
            }
            console.log("Initial data added successfully.");
        } else {
            console.log("Database already has data; initial data not added.");
        }
    } catch (error) {
        console.error("Error adding initial data:", error);
    }
}
