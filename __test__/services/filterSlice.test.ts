
import { configureStore } from "@reduxjs/toolkit";
import type { mockUser } from "../../src/api/types";
import { applyFilters, filterReducer, initialState, resetFilters, selectAllUniqueSkills, selectFilteredUsers, selectSkillsBySearchBar, selectUniqueCities, setError, setLoading, setUsers, updateActivityType, updateAuthorGender, updateCities, updateSkills, type InteractionType, type UserGender } from "../../src/services/filterSlice/flterSlice";

describe('Тестировани слайса usersFilter', () => {
    const testUsers: mockUser[] = [
        {
            id: 1,
            login: "user1",
            password: "password1",
            avatarUrl: "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHww",
            name: "Иван Петров",
            location: "Москва",
            age: "34 года",
            gender: "Мужской",
            skillCanTeach: [
                {
                id: 1011,
                name: "Управление командой"
                },
                {
                id: 1017,
                name: "Проектное управление"
                }
            ],
            subcategoriesWantToLearn: [
                {
                id: 1031,
                name: "Английский"
                },
                {
                id: 1021,
                name: "Рисование и иллюстрация"
                }
            ]
        },
        {
            id: 2,
            login: "user2",
            password: "password2",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww",
            name: "Анна Сидорова",
            location: "Санкт-Петербург",
            age: "28 лет",
            gender: "Женский",
            skillCanTeach: [
                {
                id: 1031,
                name: "Английский"
                }
            ],
            subcategoriesWantToLearn: [
                {
                id: 1022,
                name: "Фотография"
                }
            ]
        },
        {
        id: 3,
        login: "user3",
        password: "password3",
        avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww",
        name: "Сергей Иванов",
        location: "Новосибирск",
        age: "42 года",
        gender: "Мужской",
        skillCanTeach: [
            {
            id: 1022,
            name: "Фотография"
            }
        ],
        subcategoriesWantToLearn: [
            {
            id: 1033,
            name: "Испанский"
            },
            {
            id: 1023,
            name: "Видеомонтаж"
            }
        ]
        },
        {
        id: 4,
        login: "user4",
        password: "password4",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
        name: "Елена Кузнецова",
        location: "Казань",
        age: "31 год",
        gender: "Женский",
        skillCanTeach: [
            {
            id: 1021,
            name: "Рисование и иллюстрация"
            }
        ],
        subcategoriesWantToLearn: [
            {
            id: 1011,
            name: "Управление командой"
            }
        ]
        },
        {
        id: 5,
        login: "user5",
        password: "password5",
        avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
        name: "Дмитрий Смирнов",
        location: "Екатеринбург",
        age: "29 лет",
        gender: "Мужской",
        skillCanTeach: [
            {
            id: 1012,
            name: "Web-Маркетинг и реклама"
            }
        ],
        subcategoriesWantToLearn: [
            {
            id: 1042,
            name: "Навыки обучения"
            },
            {
            id: 1016,
            name: "Тайм-менеджмент"
            }
        ]
        },
    ];

    const testFilters = {
        interactionType:'canTeach' as InteractionType,
        skillsID: [1, 2, 3],
        userGender: 'female' as UserGender,
        cities: ['test cities1', 'test cities2']
    }

    const errorMessage = 'test error message'

    test('setUsers', () => {
        const state = filterReducer(undefined, setUsers(testUsers));
        expect(state.users).toEqual(testUsers);
    });

    test('setLoading', () => {
        const value = true;
        const state = filterReducer(undefined, setLoading(value));
        expect(state.loading).toBe(value);
    });

    test('setError', () => {
        const state = filterReducer(undefined, setError(errorMessage));
        expect(state.error).toBe(errorMessage);
    });

    test('updateActivityType', () => {
        const value: InteractionType = 'canTeach';
        const state = filterReducer(undefined, updateActivityType(value));
        expect(state.filters.interactionType).toBe(value);
    });

    test('updateSkills', () => {
        const value: number[] = [1, 2, 3];
        const state = filterReducer(undefined, updateSkills(value));
        expect(state.filters.skillsID).toEqual(value);
    });

    test('updateAuthorGender', () => {
        const value: UserGender = 'female';
        const state = filterReducer(undefined, updateAuthorGender(value));
        expect(state.filters.userGender).toBe(value);
    });

    test('updateCities', () => {
        const value: string[] = ['test cities1', 'test cities2'];
        const state = filterReducer(undefined, updateCities(value));
        expect(state.filters.cities).toEqual(value);
    });

    test('resetFilters', () => {
        const stateFilter = filterReducer({...initialState, filters: testFilters}, resetFilters());
        expect(stateFilter.filters).toEqual(initialState.filters);
    });

    test('applyFilters', () => {
        const newFilters = {
            userGender: 'male' as UserGender,
            interactionType:'all' as InteractionType,
        }
        const stateFilter = filterReducer({...initialState, filters: testFilters}, applyFilters(newFilters));
        expect(stateFilter.filters).toEqual({...testFilters, ...newFilters});
    });


    test('selectFilteredUsers фильтрует по полу', () => {
        const store = configureStore({
            reducer: {
                usersFilter: filterReducer
            },
            preloadedState: {
            usersFilter: {
                ...initialState,
                users: testUsers,
                filters: {
                    userGender: 'male' as UserGender,
                    cities: [],
                    interactionType: 'all' as InteractionType,
                    skillsID: [],
                },
            }},
        });

        const result = selectFilteredUsers(store.getState() as any);

        expect(result).toHaveLength(3);
        result.forEach(el => expect(el.gender).toBe('Мужской'));
    });

    test('selectFilteredUsers фильтрует по городу', () => {
        const store = configureStore({
            reducer: {
                usersFilter: filterReducer
            },
            preloadedState: {
            usersFilter: {
                ...initialState,
                users: testUsers,
                filters: {
                    userGender: 'any' as UserGender,
                    cities: ["Москва"],
                    interactionType: 'all' as InteractionType,
                    skillsID: [],
                },
            }},
        });

        const result = selectFilteredUsers(store.getState() as any);

        expect(result).toHaveLength(1);
        expect(result[0].location).toBe("Москва");
    });

    test('selectFilteredUsers фильтрует по типу взаимодействия и навыкам', () => {
        const store = configureStore({
            reducer: {
                usersFilter: filterReducer
            },
            preloadedState: {
            usersFilter: {
                ...initialState,
                users: testUsers,
                filters: {
                    userGender: 'any' as UserGender,
                    cities: [],
                    interactionType: 'canTeach' as InteractionType,
                    skillsID: [1012],
                },
            }},
        });

        const result = selectFilteredUsers(store.getState() as any);

        expect(result).toHaveLength(1);
        expect(result[0].skillCanTeach.some(el => el.id === 1012)).toBe(true);
    });

    test('selectFilteredUsers возвращает пустой массив', () => {
        const store = configureStore({
            reducer: {
                usersFilter: filterReducer
            },
            preloadedState: {
            usersFilter: {
                ...initialState,
                users: testUsers,
                filters: {
                    userGender: 'any' as UserGender,
                    cities: ['test city'],
                    interactionType: 'all' as InteractionType,
                    skillsID: [],
                },
            }},
        });

        const result = selectFilteredUsers(store.getState() as any);

        expect(result).toHaveLength(0);
    });

    test('selectFilteredUsers несколько фильтров', () => {
        const cities = ["Москва", "Новосибирск", "Санкт-Петербург"];
        const store = configureStore({
            reducer: {
                usersFilter: filterReducer
            },
            preloadedState: {
            usersFilter: {
                ...initialState,
                users: testUsers,
                filters: {
                    userGender: 'male' as UserGender,
                    cities: cities,
                    interactionType: 'all' as InteractionType,
                    skillsID: [],
                },
            }},
        });

        const result = selectFilteredUsers(store.getState() as any);

        expect(result).toHaveLength(2);
        result.forEach(el => {
            expect(el.gender).toBe('Мужской');
            expect(cities.some(sity => sity === el.location)).toBe(true);
        })
    });

    test('selectUniqueCities', () => {
        const cities = ["Екатеринбург", "Казань", "Москва", "Новосибирск", "Санкт-Петербург"];
        const store = configureStore({
            reducer: {
                usersFilter: filterReducer
            },
            preloadedState: {
            usersFilter: {
                ...initialState,
                users: testUsers,
            }},
        });

        const result = selectUniqueCities(store.getState() as any);

        expect(result).toEqual(cities);
    });

    test('selectAllUniqueSkills', () => {
        const store = configureStore({
            reducer: {
                usersFilter: filterReducer
            },
            preloadedState: {
            usersFilter: {
                ...initialState,
                users: testUsers,
            }},
        });

        const result = selectAllUniqueSkills(store.getState() as any);

        expect(result).toHaveLength(10);
    });

    test('selectSkillsBySearchBar пустой search bar', () => {
        const store = configureStore({
            reducer: {
                usersFilter: filterReducer
            },
            preloadedState: {
            usersFilter: {
                ...initialState,
                users: testUsers,
            }},
        });

        const result = selectSkillsBySearchBar(store.getState() as any, '');

        expect(result).toHaveLength(0);
    });

    test('selectSkillsBySearchBar частичный search bar', () => {
        const store = configureStore({
            reducer: {
                usersFilter: filterReducer
            },
            preloadedState: {
            usersFilter: {
                ...initialState,
                users: testUsers,
            }},
        });

        const result = selectSkillsBySearchBar(store.getState() as any, 'ия');

        expect(result).toHaveLength(3);
    });

    test('selectSkillsBySearchBar конкретный навык в search bar', () => {
        const store = configureStore({
            reducer: {
                usersFilter: filterReducer
            },
            preloadedState: {
            usersFilter: {
                ...initialState,
                users: testUsers,
            }},
        });

        const result = selectSkillsBySearchBar(store.getState() as any, 'Навыки обучения');

        expect(result).toHaveLength(1);
    });
});