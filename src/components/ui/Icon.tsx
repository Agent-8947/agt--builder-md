import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
    name: string;
}

export const Icon = ({ name, ...props }: IconProps) => {
    // Convert kebab-case or general names to PascalCase for Lucide
    const formatName = (str: string) => {
        return str
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
    };

    const IconComponent = (Icons as any)[formatName(name)] || (Icons as any)[name] || Icons.HelpCircle;
    return <IconComponent {...props} />;
};
