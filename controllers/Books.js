import Books from "../models/BookModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getBooks = async (req, res) => {
    try {
        let response;
        let totalBuku, totalKategori;

        response = await Books.findAll({
            attributes: ['uuid', 'name', 'pengarang', 'penerbit', 'isbn', 'kategori', 'sumber', 'noinduk', 'nopengenal', 'bahasa', 'link'],
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });

        totalBuku = await Books.count();
        totalKategori = await Books.count({
            distinct: true,
            col: 'kategori'
        });

        res.status(200).json({
            books: response,
            total: totalBuku,
            totalCategories: totalKategori
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getBooksByCategory = async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        const books = await Books.findAll({
            attributes: ['uuid', 'name', 'pengarang', 'penerbit', 'isbn', 'kategori', 'sumber', 'noinduk', 'nopengenal', 'bahasa', 'link'],
            where: {
                kategori: category
            },
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getBookById = async (req, res) => {
    try {
        const book = await Books.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!book) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "admin") {
            response = await Books.findOne({
                attributes: ['uuid', 'name', 'pengarang', 'penerbit', 'isbn', 'kategori', 'sumber', 'noinduk', 'nopengenal', 'bahasa', 'link'],
                where: {
                    id: book.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Books.findOne({
                attributes: ['uuid', 'name', 'pengarang', 'penerbit', 'isbn', 'kategori', 'sumber', 'noinduk', 'nopengenal', 'bahasa', 'link'],
                where: {
                    [Op.and]: [{ id: book.id }, { userId: req.userId }]
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const createBook = async (req, res) => {
    const { name, pengarang, penerbit, isbn, kategori, sumber, noinduk, nopengenal, bahasa, link } = req.body;
    if (!pengarang) {
        return res.status(400).json({ msg: "Field 'pengarang' is required" });
    }
    try {
        await Books.create({
            name: name,
            pengarang: pengarang,
            penerbit: penerbit,
            isbn: isbn,
            kategori: kategori,
            sumber: sumber,
            noinduk: noinduk,
            nopengenal: nopengenal,
            bahasa: bahasa,
            link: link ? link : null,
            userId: req.userId
        });
        res.status(201).json({ msg: "Book Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateBook = async (req, res) => {
    try {
        const book = await Books.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!book) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { name, pengarang, penerbit, isbn, kategori, sumber, noinduk, nopengenal, bahasa, link } = req.body;
        if (req.role === "admin") {
            await Books.update({ name, pengarang, penerbit, isbn, kategori, sumber, noinduk, nopengenal, bahasa, link }, {
                where: {
                    id: book.id
                }
            });
        } else {
            if (req.userId !== book.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await Books.update({ name, pengarang, penerbit, isbn, kategori, sumber, noinduk, nopengenal, bahasa, link }, {
                where: {
                    [Op.and]: [{ id: book.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Book updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteBook = async (req, res) => {
    try {
        const book = await Books.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!book) return res.status(404).json({ msg: "Data tidak ditemukan" });
        if (req.role === "admin") {
            await Books.destroy({
                where: {
                    id: book.id
                }
            });
        } else {
            if (req.userId !== book.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await Books.destroy({
                where: {
                    [Op.and]: [{ id: book.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}