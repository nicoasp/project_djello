# assignment_djello
Project management with that great wobbly taste.


- Next:

- Transform boards data after getBoards to the state below


State = {
	boards: [
		{
			id: boardId
			name: name,
			members: [
				{
					id: userId,
					name: name
				}
			],
			lists: [listId1, listId2...],
		}
	],
	lists: [
		{
			id: listId
			name: {
				savedName: "nameFromDatabase",
				editingName: "nameBeingEdited",
				editing: boolean
			},
			cards: [cardId1, cardId2...],
		}
	],
	cards: [
		{
			id: cardId
			name: {
				savedName: "nameFromDatabase",
				editingName: "nameBeingEdited",
				editing: boolean
			},
			description: {
				savedDescription: "descriptionFromDatabase",
				editingDescription: "descriptionBeingEdited",
				editing: boolean
			},
			members: [
				{
					id: userId,
					name: name
				}
			],
			activities: [activityText1, activityText2...],
		}
	],
} 