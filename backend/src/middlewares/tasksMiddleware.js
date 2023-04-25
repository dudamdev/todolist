const { response, request } = require("express");

const validateFieldTitle = (request, response, next) => {
    const { body } = request;

    if (body.title === undefined) {
        return response.status(400).json({ message: 'The field "title" is required' });
    }
    if (body.title === '') {
        return response.status(400).json({ message: 'The field "title" cannot be empty' });
    }

    next();
};

const validateFieldDescription = (request, response, next) => {
    const { body } = request;
    if (body.description === undefined) {
        return response.status(400).json({ message: 'The field "description" is required' });
    }

    next();
};

const validateFieldStatus = (request, response, next) => {
    const { body } = request;
    if (body.status === undefined) {
        return response.status(400).json({ message: 'The field "status" is required' });
    }

    next();
}

module.exports = {
    validateFieldTitle,
    validateFieldDescription,
    validateFieldStatus
};