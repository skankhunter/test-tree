const model = [
    {
        id: 1,
        title: 'root-1',
        children: [
            {
                id: 2,
                title: 'element-1',
                children: [ {
                    id: 2,
                    title: 'element-1',
                    children: [ {
                        id: 2,
                        title: 'element-1',
                        children: []
                    }]
                }]
            }
        ]
    },
    {
        id: 1,
        title: 'root-1',
        children: [
            {
                id: 2,
                title: 'element-1',
                children: []
            }
        ]
    },
];

export default model;
