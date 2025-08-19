class UserDto {
    constructor(model) {
        this.id = model.id;
        this.fullName = model.fullName;
        this.email = model.email;
        this.subscription = model.subscription;
    }
}

module.exports = UserDto;