import { Modal, Box, Typography, Button } from "@mui/material";
import { IBook } from "@/interfaces/IBook";

interface ModalProps {
  book: IBook | null;
  open: boolean;
  onClose: () => void;
}

const BookModal: React.FC<ModalProps> = ({ book, open, onClose }) => {
  if (!book) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="book-detail-modal"
      aria-describedby="book-detail-description"

    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
      }}>
        <Button onClick={onClose} style={{ float: 'right' }}>X</Button>

        <Typography id="book-detail-modal-title" variant="h6" style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>
          {book.title}
        </Typography>
        <img src={book.thumbnailUrl} alt={book.title} width="200" style={{ margin: 'auto', marginBottom: 10 }} />
        <Typography id="book-detail-description">
          {book.longDescription}
        </Typography>
        <br />
        <Typography fontWeight="bold">Autores: {book.authors as any}</Typography>
        <br />
        <Typography fontWeight="bold">Categorías: {book.categories as any}</Typography>
      </Box>
    </Modal>
  );
};

export default BookModal;

