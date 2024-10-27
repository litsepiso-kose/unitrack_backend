import { ApplicationDataModel } from "../models/applicationData.js";

const data = [
    {
        name: "Access Trust Bursary",
        description: "Supports students at Western Cape TVET colleges, covering tuition and registration fees.",
        type: 0,
        deadline: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() + 7)),
        courses: null,
        apply_link: "https://accesstrust.org.za"
    },
    {
        name: "CSIR Bursary",
        description: "Funds full-time studies in science, engineering, and technology fields for South African students.",
        type: 0,
        deadline: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() + 7)),

        courses: null,
        apply_link: "https://www.csir.co.za/bursary-programme"
    },
    {
        name: "MultiChoice Bursary",
        description: "Provides bursaries to South African students pursuing media, film, and related fields.",
        type: 0,
        deadline: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() + 7)),

        courses: null,
        apply_link: "https://bursary.multichoice.com"
    },
    {
        name: "University of Alberta Domestic Supplementary Bursary",
        description: "Provides financial aid to Canadian students in need to cover living and tuition costs.",
        type: 0,
        deadline: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() + 7)),

        courses: null,
        apply_link: "https://www.ualberta.ca/financial-support/domestic-supplementary-bursary"
    },
    {
        name: "Allan Gray Orbis Fellowship",
        description: "Supports entrepreneurial-minded students in South Africa across multiple disciplines.",
        type: 0,
        deadline: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() + 7)),

        courses: null,
        apply_link: "https://www.allangrayorbis.org/fellowship/"
    },
    {
        name: "University of Cape Town",
        description: "A leading South African university offering various undergraduate and postgraduate programs.",
        type: 1,
        deadline: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() + 7)),

        courses: ["Engineering", "Health Sciences", "Commerce", "Humanities", "Science"],
        apply_link: "https://applyonline.uct.ac.za"
    },
    // Additional entries...
];

export async function addInitialData() {
    await addInitialDataParamed(data);
}

export async function addInitialDataParamed(array: Array<{
    name: string;
    description: string;
    type: number;
    deadline?: Date;
    courses?: string[];
    apply_link: string;
}>) {
    try {
        // Check if there are already any documents in the database
        const existingDataCount = await ApplicationDataModel.countDocuments();

        // Only add initial data if the collection is empty
        if (existingDataCount === 0) {
            for (const item of array) {

                // Create a new document using the ApplicationDataModel
                const newData = new ApplicationDataModel({
                    name: item.name,
                    description: item.description,
                    type: item.type,
                    deadline: item.deadline,
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
