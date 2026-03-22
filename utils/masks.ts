import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const unMask = (value: string) => {
  return value?.replace(/\D/g, '');
};

export const maskCNPJ = (value: string) => {
  if (!value) return '';

  const onlyDigits = value.replace(/\D/g, '').substring(0, 14);

  return onlyDigits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};
export const maskNumber = (value: string) => {
  return value?.replace(/\D/g, '');
};
export const maskNumberYear = (value: string) => {
  const digitsOnly = value?.replace(/\D/g, '');

  const fourDigits = digitsOnly.slice(0, 4);

  return fourDigits;
};
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (date.toString() === 'Invalid Date') {
    return ' - ';
  }
  const formattedDate = format(date, 'dd/MM/yyyy', { locale: ptBR });

  return formattedDate;
};
export const maskText = (value: string) => {
  return value?.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
};
export const maskCEP = (cep: string) => {
  cep = cep.replace(/\D/g, '').substring(0, 8);
  const match = cep.match(/^(\d{1,5})(\d{0,3})$/);
  if (match) {
    cep = `${match[1]}${match[2] ? '-' : ''}${
      match[2] ? match[2] : ''
    }`;
    return cep;
  }
  return cep;
};

export const maskPDF = (value: string) => {
  return value?.replace(/.*\//, '');
};

export const maskPhone = (value: string) => {
  if (!value) return '';
  const onlyDigits = value.startsWith('55')
    ? value.replace(/\D/g, '').substring(2, 13)
    : value.replace(/\D/g, '').substring(0, 11);

  if (onlyDigits.length <= 10) {
    return onlyDigits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return onlyDigits
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
};

export const maskCPF = (value: string) => {
  if (!value) return '';

  const onlyDigits = value.replace(/\D/g, '').substring(0, 11);

  return onlyDigits
    ?.replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3}).(\d{3})(\d)/, '$1.$2.$3')
    .replace(/.(\d{3})(\d)/, '.$1-$2');
};
export const maskRG = (value: string) => {
  if (!value) return '';

  const onlyDigits = value.replace(/\D/g, '').substring(0, 9);

  return onlyDigits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
};
export const currencyMask = (value: number) => {
  const masked = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
  return masked;
};
export const maskDate = (value: string) => {
  if (!value) return '';

  const onlyDigits = value.replace(/\D/g, '').substring(0, 8);

  return onlyDigits
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
};
export const cardDateMask = (value: string) => {
  return value?.replace(/^(\d{2})(\d)/, '$1/$2');
};

export const extractTime = (dateString: string) => {
  const date = new Date(dateString);
  if (date.toString() === 'Invalid Date') {
    return '';
  }
  const hour = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return hour;
};
export const dateISO = (dateString: string) => {
  const parts = dateString.split('/');
  const date = `${parts[2]}-${parts[1]}-${parts[0]}`;
  const typeDate = new Date(date);
  return typeDate;
};
export const dateISOToString = (dateString: string) => {
  const parts = dateString.split('/');
  const date = `${parts[2]}-${parts[1]}-${parts[0]}`;
  return date;
};
export const dateBr = (dateString: string) => {
  if (!dateString) return '';
  const parts = dateString.split('-');
  const date = `${parts[2]}/${parts[1]}/${parts[0]}`;
  return date;
};
export const cardNumberMask = (value: string) => {
  return value
    ?.replace(/^(\d{4})(\d)/, '$1 $2')
    .replace(/^(\d{4})\s(\d{4})(\d)/, '$1 $2 $3')
    .replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/, '$1 $2 $3 $4');
};

export const CPForCNPJMask = (value: string) => {
  const unmasked = unMask(value);

  if (unmasked.length === 11) {
    return value
      ?.replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3}).(\d{3})(\d)/, '$1.$2.$3')
      .replace(/.(\d{3})(\d)/, '.$1-$2');
  }
  if (unmasked.length === 14) {
    return value
      ?.replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }

  return unmasked;
};

export const maskPhoneWithoutDDD = (value?: string) => {
  if (!value) return '';

  const onlyDigits = value.replace(/\D/g, '');

  if (onlyDigits.length === 8) {
    return onlyDigits.replace(/^(\d{4})(\d{4})$.*/, '$1-$2');
  }

  return onlyDigits.replace(/^(\d{5})(\d{4})$.*/, '$1-$2');
};

export const maskDDD = (value?: string) => {
  if (!value) return '';

  return value.replace(/\D/g, '');
};
export const unmaskPhone = (phone: string) => {
  if (!phone) return '';
  const cleanPhone = phone.replace(/[()\-\s]/g, '');
  if (cleanPhone.slice(0, 2) === '55') return cleanPhone;
  return `55${cleanPhone}`;
};
export const unmaskCurrency = (value: string) => {
  if (!value) return 0;
  const valueFormatted = value
    .replace(',', '')
    .replace('.', '')
    .replace(/\D/g, '');

  return Number(valueFormatted) / 100;
};
export const maskCurrency = (value: string) => {
  const valueFormatted = unmaskCurrency(value);

  const masked = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueFormatted);
  return masked;
};
export const formatDatePost = (timestamp: string) => {
  const date = new Date(timestamp);
  if (date.toString() === 'Invalid Date') {
    return '';
  }
  const formattedDistance = formatDistanceToNow(date, {
    addSuffix: true,
    locale: ptBR,
  });
  return formattedDistance;
};
export const formateDateLong = (data: Date): string => {
  const diaSemana = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
  }).format(data);
  const dia = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
  }).format(data);
  const mes = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
  }).format(data);
  const ano = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
  }).format(data);

  return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
};
export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};
