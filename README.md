# Clean Arch

This repository will be used to save my progress learning Clean Architecture design pattern.

The initial commit introduces the example taken from my [learning domain-driven-design-repository](https://github.com/vinisbitten/learning-domain-driven-design/tree/main/example). If you are utilizing this repository as a study resource, you can find a detailed explanation of the DDD example [here](https://github.com/vinisbitten/learning-domain-driven-design#p02).

> the readme will be improved with the passing of commits!!

every usecase will have its input DTO and output DTO

the usecase integration tests uses the sequelize model but the usecase itself does not know about the database and is independent of it

the usecase unit test mocks the repository and doesn't depend on any external resource

note that the update input and output DTOs have the same structure but cannot be the same, because both have different purposes and can change independently
