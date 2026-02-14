// Regional Indian recipes with complete nutrition data
export const regionalRecipes = [
    // Maharashtra
    {
        id: 'mh-1',
        name: 'Pav Bhaji',
        state: 'MH',
        stateName: 'Maharashtra',
        region: 'West',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800',
        category: 'Main Course',
        prepTime: '30 min',
        servings: 4,
        price: 89,
        nutrition: {
            calories: 420,
            protein: 12,
            carbs: 58,
            fat: 16,
            fiber: 8
        },
        badges: ['HIGH FIBER', 'VEGETARIAN'],
        healthScore: 75,
        ingredients: [
            '4 potatoes', '1 cup mixed vegetables', '2 tomatoes',
            '2 tbsp pav bhaji masala', '2 tbsp butter', '4 pav buns'
        ],
        instructions: 'Boil and mash vegetables. Sauté with masala and butter. Serve with toasted pav.',
        tags: ['spicy', 'street-food', 'comfort'],
        diabeticFriendly: false,
        flavorProfile: { spicy: 8, sweet: 3, tangy: 6, savory: 9 }
    },
    {
        id: 'mh-2',
        name: 'Vada Pav',
        state: 'MH',
        stateName: 'Maharashtra',
        region: 'West',
        image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800',
        category: 'Snack',
        prepTime: '25 min',
        servings: 4,
        price: 45,
        nutrition: {
            calories: 320,
            protein: 8,
            carbs: 45,
            fat: 12,
            fiber: 4
        },
        badges: ['STREET FOOD', 'QUICK'],
        healthScore: 60,
        ingredients: [
            '4 potatoes', '1 cup besan', '4 pav buns',
            'Green chutney', 'Tamarind chutney', 'Spices'
        ],
        instructions: 'Make spiced potato filling, coat in besan batter, deep fry. Serve in pav with chutneys.',
        tags: ['fried', 'street-food', 'popular'],
        diabeticFriendly: false,
        flavorProfile: { spicy: 7, sweet: 4, tangy: 7, savory: 8 }
    },
    {
        id: 'mh-3',
        name: 'Puran Poli',
        state: 'MH',
        stateName: 'Maharashtra',
        region: 'West',
        image: 'https://images.unsplash.com/photo-1589301773859-34e08b5d2c3f?w=800',
        category: 'Dessert',
        prepTime: '45 min',
        servings: 6,
        price: 120,
        nutrition: {
            calories: 380,
            protein: 10,
            carbs: 62,
            fat: 10,
            fiber: 6
        },
        badges: ['TRADITIONAL', 'FESTIVAL'],
        healthScore: 65,
        ingredients: [
            '2 cups wheat flour', '1 cup chana dal', '1 cup jaggery',
            'Cardamom', 'Ghee', 'Nutmeg'
        ],
        instructions: 'Make sweet lentil filling, stuff in wheat dough, roll and cook on tawa with ghee.',
        tags: ['sweet', 'festive', 'traditional'],
        diabeticFriendly: false,
        flavorProfile: { spicy: 1, sweet: 9, tangy: 0, savory: 3 }
    },

    // Karnataka
    {
        id: 'ka-1',
        name: 'Bisi Bele Bath',
        state: 'KA',
        stateName: 'Karnataka',
        region: 'South',
        image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=800',
        category: 'Main Course',
        prepTime: '40 min',
        servings: 4,
        price: 95,
        nutrition: {
            calories: 380,
            protein: 14,
            carbs: 54,
            fat: 12,
            fiber: 10
        },
        badges: ['HIGH PROTEIN', 'HIGH FIBER'],
        healthScore: 85,
        ingredients: [
            '1 cup rice', '1/2 cup toor dal', 'Mixed vegetables',
            'Tamarind', 'Bisi bele bath powder', 'Ghee'
        ],
        instructions: 'Cook rice and dal together. Add vegetables, tamarind, and spice powder. Temper with ghee.',
        tags: ['comfort', 'one-pot', 'nutritious'],
        diabeticFriendly: true,
        flavorProfile: { spicy: 6, sweet: 2, tangy: 7, savory: 8 }
    },
    {
        id: 'ka-2',
        name: 'Masala Dosa',
        state: 'KA',
        stateName: 'Karnataka',
        region: 'South',
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800',
        category: 'Breakfast',
        prepTime: '30 min',
        servings: 4,
        price: 75,
        nutrition: {
            calories: 280,
            protein: 8,
            carbs: 48,
            fat: 6,
            fiber: 5
        },
        badges: ['LOW FAT', 'POPULAR'],
        healthScore: 80,
        ingredients: [
            'Dosa batter', '4 potatoes', 'Onions',
            'Curry leaves', 'Mustard seeds', 'Turmeric'
        ],
        instructions: 'Make crispy dosa, fill with spiced potato masala. Serve with chutney and sambar.',
        tags: ['crispy', 'breakfast', 'south-indian'],
        diabeticFriendly: true,
        flavorProfile: { spicy: 5, sweet: 2, tangy: 4, savory: 8 }
    },
    {
        id: 'ka-3',
        name: 'Mysore Pak',
        state: 'KA',
        stateName: 'Karnataka',
        region: 'South',
        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800',
        category: 'Dessert',
        prepTime: '35 min',
        servings: 8,
        price: 150,
        nutrition: {
            calories: 450,
            protein: 6,
            carbs: 55,
            fat: 24,
            fiber: 2
        },
        badges: ['TRADITIONAL', 'RICH'],
        healthScore: 50,
        ingredients: [
            '1 cup besan', '2 cups sugar', '1 cup ghee',
            'Cardamom', 'Water'
        ],
        instructions: 'Roast besan in ghee, add sugar syrup, cook until it sets. Cut into squares.',
        tags: ['sweet', 'rich', 'festive'],
        diabeticFriendly: false,
        flavorProfile: { spicy: 0, sweet: 10, tangy: 0, savory: 2 }
    },

    // Tamil Nadu
    {
        id: 'tn-1',
        name: 'Idli Sambar',
        state: 'TN',
        stateName: 'Tamil Nadu',
        region: 'South',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800',
        category: 'Breakfast',
        prepTime: '25 min',
        servings: 4,
        price: 60,
        nutrition: {
            calories: 220,
            protein: 10,
            carbs: 42,
            fat: 2,
            fiber: 6
        },
        badges: ['HIGH PROTEIN', 'LOW FAT', 'DIABETIC FRIENDLY'],
        healthScore: 95,
        ingredients: [
            'Idli batter', 'Toor dal', 'Mixed vegetables',
            'Sambar powder', 'Tamarind', 'Curry leaves'
        ],
        instructions: 'Steam idlis. Prepare sambar with dal, vegetables, and spices. Serve hot.',
        tags: ['healthy', 'breakfast', 'light'],
        diabeticFriendly: true,
        flavorProfile: { spicy: 5, sweet: 1, tangy: 6, savory: 7 }
    },
    {
        id: 'tn-2',
        name: 'Pongal',
        state: 'TN',
        stateName: 'Tamil Nadu',
        region: 'South',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800',
        category: 'Breakfast',
        prepTime: '30 min',
        servings: 4,
        price: 70,
        nutrition: {
            calories: 320,
            protein: 12,
            carbs: 48,
            fat: 10,
            fiber: 5
        },
        badges: ['HIGH PROTEIN', 'COMFORT'],
        healthScore: 80,
        ingredients: [
            '1 cup rice', '1/2 cup moong dal', 'Ghee',
            'Black pepper', 'Cumin', 'Ginger', 'Cashews'
        ],
        instructions: 'Cook rice and dal together until mushy. Temper with spices, ghee, and cashews.',
        tags: ['comfort', 'festive', 'savory'],
        diabeticFriendly: true,
        flavorProfile: { spicy: 4, sweet: 1, tangy: 0, savory: 9 }
    },
    {
        id: 'tn-3',
        name: 'Filter Coffee',
        state: 'TN',
        stateName: 'Tamil Nadu',
        region: 'South',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800',
        category: 'Beverage',
        prepTime: '10 min',
        servings: 2,
        price: 40,
        nutrition: {
            calories: 80,
            protein: 2,
            carbs: 10,
            fat: 3,
            fiber: 0
        },
        badges: ['ENERGIZING', 'TRADITIONAL'],
        healthScore: 70,
        ingredients: [
            'Coffee powder', 'Milk', 'Sugar', 'Hot water'
        ],
        instructions: 'Brew strong coffee in filter. Mix with hot milk and sugar. Pour between vessels for froth.',
        tags: ['beverage', 'morning', 'aromatic'],
        diabeticFriendly: false,
        flavorProfile: { spicy: 0, sweet: 6, tangy: 0, savory: 2 }
    },

    // Delhi
    {
        id: 'dl-1',
        name: 'Chole Bhature',
        state: 'DL',
        stateName: 'Delhi',
        region: 'North',
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800',
        category: 'Main Course',
        prepTime: '45 min',
        servings: 4,
        price: 110,
        nutrition: {
            calories: 520,
            protein: 18,
            carbs: 68,
            fat: 20,
            fiber: 12
        },
        badges: ['HIGH PROTEIN', 'HIGH FIBER'],
        healthScore: 70,
        ingredients: [
            '2 cups chickpeas', '2 cups flour', 'Onions', 'Tomatoes',
            'Chole masala', 'Yogurt', 'Oil for frying'
        ],
        instructions: 'Cook chickpeas with spices. Make bhature dough, roll and deep fry. Serve together.',
        tags: ['rich', 'popular', 'north-indian'],
        diabeticFriendly: false,
        flavorProfile: { spicy: 7, sweet: 2, tangy: 5, savory: 9 }
    },
    {
        id: 'dl-2',
        name: 'Butter Chicken',
        state: 'DL',
        stateName: 'Delhi',
        region: 'North',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
        category: 'Main Course',
        prepTime: '50 min',
        servings: 4,
        price: 180,
        nutrition: {
            calories: 480,
            protein: 32,
            carbs: 18,
            fat: 32,
            fiber: 3
        },
        badges: ['HIGH PROTEIN', 'PREMIUM'],
        healthScore: 65,
        ingredients: [
            '500g chicken', 'Tomatoes', 'Cream', 'Butter',
            'Kasuri methi', 'Garam masala', 'Ginger-garlic'
        ],
        instructions: 'Marinate and grill chicken. Make rich tomato-butter gravy. Combine and simmer.',
        tags: ['rich', 'creamy', 'popular'],
        diabeticFriendly: false,
        flavorProfile: { spicy: 5, sweet: 4, tangy: 3, savory: 9 }
    },
    {
        id: 'dl-3',
        name: 'Aloo Paratha',
        state: 'DL',
        stateName: 'Delhi',
        region: 'North',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800',
        category: 'Breakfast',
        prepTime: '30 min',
        servings: 4,
        price: 65,
        nutrition: {
            calories: 340,
            protein: 8,
            carbs: 52,
            fat: 12,
            fiber: 5
        },
        badges: ['COMFORT', 'FILLING'],
        healthScore: 75,
        ingredients: [
            '2 cups wheat flour', '4 potatoes', 'Green chilies',
            'Coriander', 'Spices', 'Ghee'
        ],
        instructions: 'Make spiced potato filling. Stuff in wheat dough, roll and cook with ghee.',
        tags: ['breakfast', 'filling', 'traditional'],
        diabeticFriendly: true,
        flavorProfile: { spicy: 6, sweet: 1, tangy: 2, savory: 8 }
    },

    // Additional states for comprehensive coverage
    {
        id: 'pb-1',
        name: 'Sarson Ka Saag',
        state: 'PB',
        stateName: 'Punjab',
        region: 'North',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',
        category: 'Main Course',
        prepTime: '60 min',
        servings: 4,
        price: 130,
        nutrition: {
            calories: 280,
            protein: 10,
            carbs: 32,
            fat: 14,
            fiber: 8
        },
        badges: ['HIGH FIBER', 'WINTER SPECIAL'],
        healthScore: 85,
        ingredients: [
            'Mustard greens', 'Spinach', 'Makki flour',
            'Ginger', 'Garlic', 'Butter', 'Spices'
        ],
        instructions: 'Cook greens with spices until soft. Blend and temper with butter. Serve with makki roti.',
        tags: ['healthy', 'winter', 'traditional'],
        diabeticFriendly: true,
        flavorProfile: { spicy: 6, sweet: 1, tangy: 2, savory: 9 }
    },
    {
        id: 'gj-1',
        name: 'Dhokla',
        state: 'GJ',
        stateName: 'Gujarat',
        region: 'West',
        image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800',
        category: 'Snack',
        prepTime: '25 min',
        servings: 6,
        price: 55,
        nutrition: {
            calories: 180,
            protein: 6,
            carbs: 32,
            fat: 3,
            fiber: 4
        },
        badges: ['LOW FAT', 'DIABETIC FRIENDLY'],
        healthScore: 90,
        ingredients: [
            'Besan', 'Yogurt', 'Eno', 'Mustard seeds',
            'Curry leaves', 'Green chilies', 'Lemon'
        ],
        instructions: 'Make fermented besan batter, steam until fluffy. Temper and garnish.',
        tags: ['light', 'steamed', 'healthy'],
        diabeticFriendly: true,
        flavorProfile: { spicy: 4, sweet: 3, tangy: 7, savory: 6 }
    },
    {
        id: 'wb-1',
        name: 'Macher Jhol',
        state: 'WB',
        stateName: 'West Bengal',
        region: 'East',
        image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800',
        category: 'Main Course',
        prepTime: '35 min',
        servings: 4,
        price: 160,
        nutrition: {
            calories: 320,
            protein: 28,
            carbs: 12,
            fat: 18,
            fiber: 3
        },
        badges: ['HIGH PROTEIN', 'OMEGA-3'],
        healthScore: 88,
        ingredients: [
            'Fish (Rohu/Katla)', 'Potatoes', 'Tomatoes',
            'Panch phoron', 'Turmeric', 'Green chilies', 'Mustard oil'
        ],
        instructions: 'Fry fish and potatoes. Make light curry with panch phoron and tomatoes. Simmer together.',
        tags: ['light', 'fish', 'bengali'],
        diabeticFriendly: true,
        flavorProfile: { spicy: 5, sweet: 2, tangy: 4, savory: 8 }
    },
    {
        id: 'rj-1',
        name: 'Dal Baati Churma',
        state: 'RJ',
        stateName: 'Rajasthan',
        region: 'North',
        image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800',
        category: 'Main Course',
        prepTime: '70 min',
        servings: 4,
        price: 140,
        nutrition: {
            calories: 580,
            protein: 16,
            carbs: 72,
            fat: 26,
            fiber: 10
        },
        badges: ['TRADITIONAL', 'RICH'],
        healthScore: 65,
        ingredients: [
            'Wheat flour', 'Mixed dal', 'Jaggery',
            'Ghee', 'Spices', 'Dry fruits'
        ],
        instructions: 'Bake baati, prepare dal, make sweet churma. Serve together with ghee.',
        tags: ['rich', 'festive', 'rajasthani'],
        diabeticFriendly: false,
        flavorProfile: { spicy: 6, sweet: 7, tangy: 2, savory: 8 }
    },
    {
        id: 'kl-1',
        name: 'Appam with Stew',
        state: 'KL',
        stateName: 'Kerala',
        region: 'South',
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800',
        category: 'Breakfast',
        prepTime: '40 min',
        servings: 4,
        price: 95,
        nutrition: {
            calories: 290,
            protein: 12,
            carbs: 42,
            fat: 8,
            fiber: 4
        },
        badges: ['LIGHT', 'COCONUT'],
        healthScore: 82,
        ingredients: [
            'Rice', 'Coconut', 'Yeast', 'Mixed vegetables',
            'Coconut milk', 'Spices', 'Curry leaves'
        ],
        instructions: 'Ferment rice-coconut batter, make lacy appams. Prepare coconut milk stew with vegetables.',
        tags: ['light', 'kerala', 'breakfast'],
        diabeticFriendly: true,
        flavorProfile: { spicy: 4, sweet: 3, tangy: 2, savory: 7 }
    }
];

// State to dishes mapping
export const stateRecipes = {
    'MH': ['Pav Bhaji', 'Vada Pav', 'Puran Poli'],
    'KA': ['Bisi Bele Bath', 'Masala Dosa', 'Mysore Pak'],
    'TN': ['Idli-Sambar', 'Pongal', 'Filter Coffee'],
    'DL': ['Chole Bhature', 'Butter Chicken', 'Aloo Paratha'],
    'PB': ['Sarson Ka Saag', 'Makki Di Roti', 'Lassi'],
    'GJ': ['Dhokla', 'Thepla', 'Khandvi'],
    'WB': ['Macher Jhol', 'Rasgulla', 'Mishti Doi'],
    'RJ': ['Dal Baati Churma', 'Laal Maas', 'Ghevar'],
    'KL': ['Appam with Stew', 'Puttu', 'Fish Curry'],
    'AP': ['Hyderabadi Biryani', 'Gongura Pachadi', 'Pesarattu'],
    'TS': ['Hyderabadi Biryani', 'Mirchi Ka Salan', 'Double Ka Meetha'],
    'UP': ['Lucknowi Biryani', 'Tunday Kabab', 'Petha'],
    'BR': ['Litti Chokha', 'Sattu Paratha', 'Khaja'],
    'OR': ['Dalma', 'Pakhala', 'Rasgulla'],
    'AS': ['Masor Tenga', 'Pitha', 'Duck Curry'],
    'HP': ['Siddu', 'Chana Madra', 'Babru'],
    'UK': ['Aloo Ke Gutke', 'Kafuli', 'Bal Mithai'],
    'JH': ['Dhuska', 'Pittha', 'Thekua'],
    'CT': ['Chila', 'Bafauri', 'Petha'],
    'MP': ['Poha', 'Bhutte Ka Kees', 'Mawa Bati'],
    'HR': ['Bajra Khichdi', 'Kadhi Pakora', 'Besan Masala Roti'],
    'GA': ['Fish Curry', 'Bebinca', 'Xacuti'],
    'MN': ['Eromba', 'Singju', 'Chamthong'],
    'TR': ['Mui Borok', 'Wahan Mosdeng', 'Chakhwi'],
    'ML': ['Jadoh', 'Dohneiiong', 'Pumaloi'],
    'MZ': ['Bai', 'Vawksa Rep', 'Sawhchiar'],
    'NL': ['Smoked Pork', 'Axone', 'Galho'],
    'SK': ['Thukpa', 'Momos', 'Gundruk']
};

// Get recipes by state
export const getRecipesByState = (stateCode) => {
    return regionalRecipes.filter(recipe => recipe.state === stateCode);
};

// Get recipes by health filter
export const getRecipesByHealth = (filter) => {
    switch (filter) {
        case 'diabetic':
            return regionalRecipes.filter(r => r.diabeticFriendly);
        case 'high-protein':
            return regionalRecipes.filter(r => r.nutrition.protein >= 15);
        case 'low-carb':
            return regionalRecipes.filter(r => r.nutrition.carbs < 40);
        default:
            return regionalRecipes;
    }
};

// Mock AI personalization
export const getPersonalizedRecipes = (userPreferences = {}) => {
    const { location = 'DL', healthGoal = 'balanced', tastePreference = 'spicy' } = userPreferences;

    // Bias towards user's region
    let scored = regionalRecipes.map(recipe => {
        let score = recipe.healthScore;

        // Regional bias
        if (recipe.state === location) score += 20;
        if (recipe.region === getRegionByState(location)) score += 10;

        // Health goal bias
        if (healthGoal === 'weight-loss' && recipe.nutrition.calories < 300) score += 15;
        if (healthGoal === 'muscle-gain' && recipe.nutrition.protein >= 20) score += 15;
        if (healthGoal === 'diabetic' && recipe.diabeticFriendly) score += 20;

        // Taste preference
        if (tastePreference === 'spicy' && recipe.flavorProfile.spicy >= 6) score += 10;
        if (tastePreference === 'sweet' && recipe.flavorProfile.sweet >= 6) score += 10;

        return { ...recipe, aiScore: score };
    });

    return scored.sort((a, b) => b.aiScore - a.aiScore);
};

const getRegionByState = (state) => {
    const regions = {
        'DL': 'North', 'PB': 'North', 'HR': 'North', 'UP': 'North', 'RJ': 'North',
        'MH': 'West', 'GJ': 'West', 'GA': 'West',
        'TN': 'South', 'KA': 'South', 'KL': 'South', 'AP': 'South', 'TS': 'South',
        'WB': 'East', 'OR': 'East', 'BR': 'East', 'JH': 'East'
    };
    return regions[state] || 'North';
};
