import React, { useState, useEffect } from "react";
import {
    Box, Button, TextField, Select, MenuItem, IconButton, Dialog,
    DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel
} from "@mui/material";
import BookmarkAdd from "@mui/icons-material/BookmarkAdd";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import PageWrapper from "../../structure/PageWrapper";
import * as bookws from "../../services/bookws";

// const booksList = [
//     { titulo: "Dom Quixote", autor: "Miguel de Cervantes", editora: "Planeta", anoPublicacao: 1605, ISBN: "1234567890", tipo: "fisico" },
//     { titulo: "1984", autor: "George Orwell", editora: "Companhia das Letras", anoPublicacao: 1949, ISBN: "2345678901", tipo: "ebook" },
//     { titulo: "O Hobbit", autor: "J.R.R. Tolkien", editora: "HarperCollins", anoPublicacao: 1937, ISBN: "3456789012", tipo: "fisico" },
// ];
const style = {
    grid: { bgcolor: "#c6c4c4" },
    select: {
        // ml: 2,
        // marginRight: 2, 
        width: "250px", 
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#393536',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#393536',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#393536',
        },
        '& .MuiSelect-icon': {
            color: '#393536',
        },
    },
    tableContainer: { maxWidth: "80%", margin: "20px 0" },
    textfield: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#393536',
            },
            '&:hover fieldset': {
                borderColor: '#393536',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#393536',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#393536',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#393536',
        },
        '& .Mui-disabled': {
            color: '#393536',
        },
        marginLeft: 3
    }
};
export default function Home() {
    const [updateFlag, setUpdateFlag] = useState(true);
    const [books, setBooks] = useState([]);
    const [searchResults, setSearchResults] = useState(books);
    const [bookType, setBookType] = useState("Fisico");
    const [searchMethod, setSearchMethod] = useState("id");
    const [searchValue, setSearchValue] = useState("");
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [form, setForm] = useState({ titulo: "", autor: "", editora: "", anoPublicacao: "", ISBN: "", tipo: "" });

    // console.log({ books: books })

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await bookws.getLivros();
                setBooks(fetchedBooks);
            } catch (error) {
                console.error("Erro ao buscar livros", error);
            }
        };

        fetchBooks();
    }, [updateFlag]);

    useEffect(() => {
        let filteredBooks = books;

        if (bookType) {
            filteredBooks = filteredBooks.filter((book) => book.tipo === bookType);
        }

        if (searchValue.trim() !== "") {
            if (searchMethod === "id") {
                filteredBooks = filteredBooks.filter((book) => book.isbn.includes(searchValue));
            } else if (searchMethod === "titulo") {
                filteredBooks = filteredBooks.filter((book) => book.titulo.toLowerCase().includes(searchValue.toLowerCase()));
            }
        }

        setSearchResults(filteredBooks);
    }, [bookType, searchMethod, searchValue, books]);

    const refreshBooks = () => { setUpdateFlag((prevFlag) => !prevFlag) };

    const handleTypeChange = (event) => setBookType(event.target.value);

    const handleSearchMethodChange = (event) => setSearchMethod(event.target.value);

    const handleSearchValueChange = (event) => setSearchValue(event.target.value);

    const handleOpenAddDialog = () => {
        setForm({ titulo: "", autor: "", editora: "", anoPublicacao: "", ISBN: "", tipo: "" });
        setOpenAddDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenAddDialog(false);
        setOpenEditDialog(false);
        setOpenConfirmDeleteDialog(false);
    };

    const handleAddBook = () => {
        if (Object.values(form).every((field) => field.trim() !== "")) {
            setBooks([...books, form]);
            setSearchResults([...searchResults, form]);
            alert("Livro adicionado com sucesso!");
            handleCloseDialog();
        } else {
            alert("Preencha todos os campos para adicionar o livro.");
        }
    };

    const handleOpenEditDialog = (book) => {
        setSelectedBook(book);
        setForm(book);
        setOpenEditDialog(true);
    };

    const handleUpdateBook = () => {
        const updateBook = async () => {
            try {
                console.log({ form: form, selectedBook: selectedBook })
                await bookws.updateLivro(selectedBook.id, form);
                const updatedBooks = books.filter((b) => b.ISBN === selectedBook.isbn ? form : b);
                setBooks(updatedBooks);
                setSearchResults(updatedBooks);

                alert("Livro Atualizado com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar livro", error);
            }
        };
        updateBook();
        refreshBooks();
        handleCloseDialog();
    };

    const handleOpenConfirmDeleteDialog = () => setOpenConfirmDeleteDialog(true);

    const handleDeleteBook = () => {
        const deleteBook = async () => {
            try {
                await bookws.delLivro(selectedBook.id);
                const updatedBooks = books.filter((b) => b.ISBN !== selectedBook.ISBN);
                setBooks(updatedBooks);
                setSearchResults(updatedBooks);

                alert("Livro excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao deletar livro", error);
            }
        };
        deleteBook();
        refreshBooks();
        handleCloseDialog();
    };


    return (
        <PageWrapper>
            {({ width, height }) => (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width={width}
                    height={height}
                    sx={style.grid}
                    p={4}
                >
                    {/* Filtro de Tipo de Livro */}
                    <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                        <FormControl fullWidth sx={{ ml: 2 }}>
                            <InputLabel shrink
                                sx={{
                                    color: '#393536',
                                    '&.Mui-focused': { color: '#393536' },
                                }}> Método</InputLabel>
                            <Select
                                label="Método"
                                value={searchMethod}
                                onChange={handleSearchMethodChange}
                                sx={style.select}
                                displayEmpty
                            >
                                <MenuItem value="id">ID</MenuItem>
                                <MenuItem value="titulo">Título</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            sx={style.textfield}
                            value={searchValue}
                            onChange={handleSearchValueChange}
                            label="Buscar"
                            fullWidth
                            variant="outlined"
                        />
                        <FormControl fullWidth sx={{ ml: 2 }}>
                            <InputLabel shrink
                                sx={{
                                    color: '#393536',
                                    '&.Mui-focused': { color: '#393536' },
                                }}> Tipo</InputLabel>
                            <Select
                                label="Tipo"
                                defaultValue="Fisico"
                                value={bookType}
                                onChange={handleTypeChange}
                                displayEmpty
                                sx={style.select}
                            >
                                {/* <MenuItem value="">Todos</MenuItem> */}
                                <MenuItem value="Fisico">Físico</MenuItem>
                                <MenuItem value="Digital">Digital</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Filtro de Método de Busca (ID/Título) */}
                    {/* <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                        <Select
                            value={searchMethod}
                            onChange={handleSearchMethodChange}
                            sx={style.select}
                            displayEmpty
                        >
                            <MenuItem value="id">ID</MenuItem>
                            <MenuItem value="titulo">Título</MenuItem>
                        </Select>
                        <TextField
                            sx={{ ml: 2 }}
                            value={searchValue}
                            onChange={handleSearchValueChange}
                            label="Buscar"
                            fullWidth
                            variant="outlined"
                        />
                    </Box> */}

                    {/* Tabela de Livros */}
                    <TableContainer component={Paper} sx={style.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Título</TableCell>
                                    <TableCell>Autor</TableCell>
                                    <TableCell>Editora</TableCell>
                                    <TableCell>Ano de Publicação</TableCell>
                                    <TableCell>ISBN</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Disponível</TableCell>
                                    {bookType === "Fisico" && <TableCell>Quantidade</TableCell>}
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchResults.map((book, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{book.titulo}</TableCell>
                                        <TableCell>{book.autor}</TableCell>
                                        <TableCell>{book.editora}</TableCell>
                                        <TableCell>{book.anoPublicacao}</TableCell>
                                        <TableCell>{book.isbn}</TableCell>
                                        <TableCell>{book.tipo}</TableCell>
                                        <TableCell>{book.disponivel ? "Sim" : "Não"}</TableCell>
                                        {book.tipo === "Fisico" && <TableCell>{book.quantidade}</TableCell>}
                                        <TableCell>
                                            <IconButton onClick={() => handleOpenEditDialog(book)}>
                                                <MoreHoriz />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Botão de Adição */}
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        width="80%"
                    // margin="20px 0"
                    >
                        <IconButton onClick={handleOpenAddDialog}><BookmarkAdd /></IconButton>
                    </Box>

                    {/* Diálogo de Adição */}
                    <Dialog open={openAddDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Adicionar Livro</DialogTitle>
                        <DialogContent sx={{ marginTop: '5px', '& > *': { marginTop: '10px' } }}>
                            <TextField label="Título" fullWidth value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
                            <TextField label="Autor" fullWidth value={form.autor} onChange={(e) => setForm({ ...form, autor: e.target.value })} />
                            <TextField label="Editora" fullWidth value={form.editora} onChange={(e) => setForm({ ...form, editora: e.target.value })} />
                            <TextField label="Ano de Publicação" fullWidth value={form.anoPublicacao} onChange={(e) => setForm({ ...form, anoPublicacao: e.target.value })} />
                            <TextField label="ISBN" fullWidth value={form.ISBN} onChange={(e) => setForm({ ...form, ISBN: e.target.value })} />
                            <FormControl fullWidth sx={{ marginTop: '10px' }}>
                                <InputLabel>Tipo</InputLabel>
                                <Select
                                    value={form.tipo}
                                    onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                                    label="Tipo"  // Associando o label ao Select
                                >
                                    <MenuItem value="Fisico">Físico</MenuItem>
                                    <MenuItem value="Digital">Digital</MenuItem>
                                </Select>
                            </FormControl>
                            {form.tipo === "Fisico" && (
                                <TextField
                                    label="Quantidade"
                                    fullWidth
                                    value={form.quantidade}
                                    onChange={(e) => setForm({ ...form, quantidade: e.target.value })}
                                />
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Voltar</Button>
                            <Button onClick={handleAddBook}>Adicionar</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Diálogo de Edição */}
                    <Dialog open={openEditDialog} onClose={handleCloseDialog}>
                        <DialogTitle sx={{ margin: '5px' }}>Editar Livro</DialogTitle>
                        <DialogContent sx={{ marginTop: '5px', '& > *': { marginTop: '10px' } }}>
                            <TextField label="Título" fullWidth value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
                            <TextField label="Autor" fullWidth value={form.autor} onChange={(e) => setForm({ ...form, autor: e.target.value })} />
                            <TextField label="Editora" fullWidth value={form.editora} onChange={(e) => setForm({ ...form, editora: e.target.value })} />
                            <TextField label="Ano de Publicação" fullWidth value={form.anoPublicacao} onChange={(e) => setForm({ ...form, anoPublicacao: e.target.value })} />
                            {/* <TextField label="ISBN" fullWidth value={form.ISBN} onChange={(e) => setForm({ ...form, ISBN: e.target.value })} /> */}
                            <FormControl fullWidth sx={{ marginTop: '10px' }}>
                                <InputLabel>Disponivel</InputLabel>
                                <Select label="Disponivel" fullWidth value={form.disponivel} onChange={(e) => setForm({ ...form, disponivel: e.target.value })}>
                                    <MenuItem value={true}>Sim</MenuItem>
                                    <MenuItem value={false}>Não</MenuItem>
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Voltar</Button>
                            <Button onClick={handleUpdateBook}>Atualizar</Button>
                            <Button onClick={handleOpenConfirmDeleteDialog}>Deletar</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Diálogo de Confirmação de Exclusão */}
                    <Dialog open={openConfirmDeleteDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                        <DialogContent>Tem certeza de que deseja excluir este livro?</DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Voltar</Button>
                            <Button onClick={handleDeleteBook}>Confirmar</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            )}
        </PageWrapper>
    );
}
