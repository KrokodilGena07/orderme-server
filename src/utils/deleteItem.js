const ApiError = require('../error/api.error');


async function deleteItem(find, id, error) {
    const item = await find(id);
    if (!item) {
        throw ApiError.badRequest(error);
    }

    await item.destroy();
}

module.exports = deleteItem;