const menu = {
    items: [
        {
            id: 'MK_001',
            name: 'Móc khóa lọ nước',
            options: ['MK_001'],
        },
        {
            id: 'KT_001',
            name: 'Khuyên Tai',
            options: ['KT_001'],
        },
        {
            id: 'T_001',
            name: 'Túi vải',
            options: ['T_001'],
        },
        {
            id: 'T_002',
            name: 'Túi bị da',
            options: ['T_002'],
        }
    ],
    options: [
        {
            id: 'strength',
            choices: [
                {
                    id: 'single',
                    name: 'Single',
                },
                {
                    id: 'double',
                    name: 'Double',
                },
                {
                    id: 'triple',
                    name: 'Triple',
                },
                {
                    id: 'quad',
                    name: 'Quad',
                },
            ],
        },
        {
            id: 'milk',
            choices: [
                {
                    id: 'whole',
                    name: 'Whole',
                },
                {
                    id: 'lowfat',
                    name: 'Low fat',
                },
                {
                    id: 'almond',
                    name: 'Almond',
                },
                {
                    id: 'soy',
                    name: 'Soy',
                },
            ],
        },
    ],

    listOfTypes() {
        return menu.items.map(i => ({ text: i.name, value: i.id }));
    },

    listOfChoicesForOption(optionId) {
        return menu.options.find(o => o.id === optionId).choices
            .map(c => ({ text: c.name, value: c.id }));
    },

    choiceNameForId(optionId, choiceId) {
        const option = menu.options.find(o => o.id === optionId);
        if (option) {
            return option.choices.find(c => c.id === choiceId).name;
        }
        return false;
    },
};

module.exports = menu;