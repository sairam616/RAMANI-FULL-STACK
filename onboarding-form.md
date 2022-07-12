##PART-3: WRITTEN EVALUATION

Currently, the endpoint that returns the onboarding form (GET /api/onboarding) returns hardcoded data. Can you describe the benefits/drawbacks around saving this onboarding steps data in the front-end, back-end (as hardcoded data), or in the database? When would you want to save the data at different levels of the stack?
Considerations



## ANSWER

As per my Knowledge,

## Advantages
Saving hard-coded data in the backend or in the front-end reduces the time and increases the speed of the request and response b/w front-end and backend as there will be no need to perform database operations for the data.

## Disadvantages
On the other hand, it takes up the storage and accessing the data is quite hard. For example, the STEPS data from backed has nested arrays and it is difficult to de-structure the keys and get the values, where as if the data is stored in data base it would be easier to grab and use.



