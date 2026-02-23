import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

interface CustomBreadcrumbsProps {
    items: { label: string; href?: string }[];
}

export default function CustomBreadcrumbs({ items }: CustomBreadcrumbsProps) {
    return (
        <Breadcrumbs separator={<NavigateBeforeIcon fontSize="small" />} aria-label="breadcrumb">
            {items.map((item, index) => (
                item.href ? (
                    <Link key={index} color="inherit" href={item.href}>
                        {item.label}
                    </Link>
                ) : (
                    <span key={index} style={{ color: 'text.primary' }}>
                        {item.label}
                    </span>
                )
            ))}
        </Breadcrumbs>
    );
}