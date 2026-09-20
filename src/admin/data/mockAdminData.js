export const stats = {
    total: 1248,
    newComplaints: 245,
    inProgress: 350,
    resolved: 653
};

export const authorities = [
    { name: "MCC", complaints: 625 },
    { name: "Hootagalli CMC", complaints: 180 },
    { name: "Town Panchayat", complaints: 310 },
    { name: "Gram Panchayat", complaints: 133 }
];

export const complaints = [
    {
        id: 101,
        issue: "Pothole",
        authority: "MCC",
        status: "New"
    },
    {
        id: 102,
        issue: "Garbage",
        authority: "Hootagalli CMC",
        status: "Assigned"
    }
];