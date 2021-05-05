export const tutorial =
{
    nodes: [
        { id: "applicant" }, //0
        { id: "flash interview" }, //1
        { id: "test task" }, //2
        { id: "technical interview" }, //3
        { id: "offer" }, //4
        { id: "success"}, //5
    ],
    links: [

        {
            source: 0,
            target: 3
        },
        {
            source: 0,
            target: 1
        },
        {
            source: 1,
            target: 2
        },
        {
            source: 1,
            target: 3
        },
        {
            source: 2,
            target: 3
        },
        {
            source: 2,
            target: 4
        },
        {
            source: 3,
            target: 4
        },
        {
            source: 4,
            target: 5
        },
    ]
}
